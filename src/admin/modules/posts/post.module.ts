import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { NotionService } from '../notion/notion.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostRepository } from 'src/app/repositories/post.repository';
import { PostModel, PostSchema } from 'src/app/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostModel.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService, PostRepository, NotionService],
})
export class PostModule {}
