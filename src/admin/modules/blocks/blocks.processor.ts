import {
  OnGlobalQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { DoneCallback, Job } from 'bull';
import { NotionService } from '../notion/notion.service';
import { BlockRepository } from '../../../app/repositories/block.repository';
import { BlockModel } from '../../../app/schemas/block.schema';

@Processor('block')
export class BlocksProcessor {
  constructor(
    private notionService: NotionService,
    private blockRepository: BlockRepository,
  ) {}

  private readonly logger = new Logger(BlocksProcessor.name);

  @Process('updateBlocks')
  async handleUpdateBlocks(job: Job, done: DoneCallback) {
    try {
      this.logger.debug('Start UpdateBlock...');
      this.logger.debug(job.data);
      const blocks = await this.getBlock(job.data.id);

      await this.blockRepository.bulkCreateOrUpdate(blocks);
      this.logger.debug('UpdateBlock completed');
      done(null, true);
    } catch (e) {
      done(e, true);
    }
  }

  async getBlock(id: string) {
    const resBlock = await this.notionService.getBlock(id);
    const blocks = resBlock.results as any;

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (block.has_children) {
        blocks[i].children = await this.getBlock(block.id);
      }
    }

    return blocks;
  }

  // @OnQueueCompleted()
  // handleOnCompleted(job: Job, done: DoneCallback) {
  //   console.log('234');
  // }

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    this.logger.log('(Global) on completed: job ', [
      jobId,
      ' -> result: ',
      result,
    ]);
  }

  @OnQueueError()
  async OnQueueError(error: Error) {
    this.logger.error('OnQueueError: job ', error);
    console.error(error);
  }

  @OnQueueFailed()
  OnQueueFailed(job: Job, err: Error) {
    this.logger.error('OnQueueError: job ', [job, err]);
  }
}
