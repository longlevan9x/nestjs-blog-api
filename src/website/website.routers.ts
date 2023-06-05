import { Routes } from '@nestjs/core';
import { PostModule } from './posts/post.module';
import { SlidersModule } from './sliders/sliders.module';
import { TagsModule } from './tags/tags.module';
import { BlocksModule } from './blocks/blocks.module';

export const websiteRoutes: Routes = [
  {
    path: 'app',
    children: [
      {
        path: '/posts',
        module: PostModule,
        children: [
          {
            path: '/:id/blocks',
            module: BlocksModule,
          },
        ],
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
