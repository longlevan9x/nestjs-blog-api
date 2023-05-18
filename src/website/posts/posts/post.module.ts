import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModel, PostSchema } from '../../../app/schemas/post.schema';
import { PostRepository } from '../../../app/repositories/post.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostModel.name, schema: PostSchema }]),
  ],
  providers: [PostService, PostRepository],
  controllers: [PostController],
})
export class PostModule {}
