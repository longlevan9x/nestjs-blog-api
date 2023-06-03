import { Module } from '@nestjs/common';
import { SlackService } from './slack.service';
import { NotionService } from '../../admin/modules/notion/notion.service';

@Module({
  providers: [SlackService, NotionService],
})
export class SlackModule {}
