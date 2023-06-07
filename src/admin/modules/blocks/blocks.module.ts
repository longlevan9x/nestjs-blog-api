import { Module } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { BlocksController } from './blocks.controller';
import { NotionService } from '../notion/notion.service';
import { BlocksProcessor } from './blocks.processor';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockModel, BlockSchema } from '../../../app/schemas/block.schema';
import { BlockRepository } from '../../../app/repositories/block.repository';

@Module({
  controllers: [BlocksController],
  providers: [BlocksService, NotionService, BlocksProcessor, BlockRepository],
  imports: [
    MongooseModule.forFeature([{ name: BlockModel.name, schema: BlockSchema }]),
  ],
})
export class BlocksModule {}
