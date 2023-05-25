import { Module } from '@nestjs/common';
import { PostModule } from './posts/post.module';
import { SlidersModule } from './sliders/sliders.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [PostModule, SlidersModule, TagsModule],
})
export class WebsiteModule {}
