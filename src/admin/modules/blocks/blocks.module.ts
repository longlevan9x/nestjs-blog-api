import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { NotionService } from '../notion/notion.service';

@Module({
  controllers: [BlocksController],
  providers: [BlocksService, NotionService],
})
export class BlocksModule {}
