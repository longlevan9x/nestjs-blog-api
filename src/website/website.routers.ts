import { Routes } from '@nestjs/core';
import { PostModule } from './posts/post.module';
import { SlidersModule } from './sliders/sliders.module';
import { TagsModule } from './tags/tags.module';

export const websiteRoutes: Routes = [
  {
    path: 'app',
    children: [
      {
        path: '/posts',
        module: PostModule,
      },
      {
        path: '/sliders',
        module: SlidersModule,
      },
      {
        path: '/tags',
        module: TagsModule,
      },
    ],
  },
];
