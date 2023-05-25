import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TagModel, TagSchema } from '../../../app/schemas/tag';
import { TagRepository } from '../../../app/repositories/tag.repository';
import { NotionService } from '../notion/notion.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagRepository, NotionService],
  imports: [
    MongooseModule.forFeature([{ name: TagModel.name, schema: TagSchema }]),
  ],
})
export class TagsModule {}
