import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagRepository } from '../../app/repositories/tag.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { TagModel, TagSchema } from '../../app/schemas/tag';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagRepository],
  imports: [
    MongooseModule.forFeature([{ name: TagModel.name, schema: TagSchema }]),
  ],
})
export class TagsModule {}
