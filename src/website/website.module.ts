import { Module } from '@nestjs/common';
import { PostModule } from './posts/posts/post.module';

@Module({
  imports: [PostModule],
})
export class WebsiteModule {}
