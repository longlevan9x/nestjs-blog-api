import {
  OnGlobalQueueCompleted,
  OnQueueFailed,
  OnQueueError,
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
    this.logger.debug('Start UpdateBlock...');
    this.logger.debug(job.data);
    if (job.data.id !== '1193d206-5484-405e-b769-05f1a918fabf') {
      done(null, true);
      return;
    }

    const resBlock = await this.notionService.getBlock(job.data.id);

    const blocks: BlockModel[] = resBlock.results as any;
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].has_children) {
        const resChildrenBlock = await this.notionService.getBlock(
          blocks[i].id,
        );

        blocks[i].children = resChildrenBlock.results;
      }
    }

    blocks.forEach((b) => {
      if (b.has_children) {
        console.log(b);
      }
    });
    await this.blockRepository.bulkCreateOrUpdate(resBlock.results);
    this.logger.debug('UpdateBlock completed');
    done(null, true);
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
