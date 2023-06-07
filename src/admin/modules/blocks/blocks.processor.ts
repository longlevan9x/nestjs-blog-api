import {
  OnGlobalQueueCompleted,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { DoneCallback, Job } from 'bull';
import { NotionService } from '../notion/notion.service';
import { BlockRepository } from '../../../app/repositories/block.repository';

@Processor('block')
export class BlocksProcessor {
  constructor(
    private notionService: NotionService,
    private blockRepository: BlockRepository,
  ) {}

  private readonly logger = new Logger(BlocksProcessor.name);

  @Process('updateBlocks')
  async handleUpdateBlocks(job: Job, done: DoneCallback) {
    this.logger.debug('Start transcoding...');
    const resBlock = await this.notionService.getBlock(job.data.id);
    await this.blockRepository.bulkCreateOrUpdate(resBlock.results);
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
    done(null, true);
  }

  // @OnQueueCompleted()
  // handleOnCompleted(job: Job, done: DoneCallback) {
  //   console.log('234');
  // }

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: any) {
    console.log('(Global) on completed: job ', jobId, ' -> result: ', result);
  }
}
