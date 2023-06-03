import { Module } from '@nestjs/common';
import { PostModule } from './posts/post.module';
import { SlidersModule } from './sliders/sliders.module';
import { TagsModule } from './tags/tags.module';
import { RouterModule } from '@nestjs/core';
import { websiteRoutes } from './website.routers';

@Module({
  imports: [
    RouterModule.register(websiteRoutes),
    PostModule,
    SlidersModule,
    TagsModule,
  ],
})
export class WebsiteModule {}
