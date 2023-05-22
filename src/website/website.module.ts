import { Module } from '@nestjs/common';
import { PostModule } from './posts/post.module';
import { SlidersModule } from './sliders/sliders.module';

@Module({
  imports: [PostModule, SlidersModule],
})
export class WebsiteModule {}
