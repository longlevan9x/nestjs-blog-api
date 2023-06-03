import { Routes } from '@nestjs/core';
import { PostModule } from './modules/posts/post.module';
import { SlidersModule } from './modules/sliders/sliders.module';
import { UserModule } from './modules/user/user.module';
import { NotionModule } from './modules/notion/notion.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlocksModule } from './modules/blocks/blocks.module';
import { TagsModule } from './modules/tags/tags.module';

export const adminRoutes: Routes = [
  {
    path: 'admin',
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
        path: '/users',
        module: UserModule,
      },
      {
        path: '/notions',
        module: NotionModule,
      },
      {
        path: '/auth',
        module: AuthModule,
      },
      {
        path: '/blocks',
        module: BlocksModule,
      },
      {
        path: '/tags',
        module: TagsModule,
      },
    ],
  },
];
