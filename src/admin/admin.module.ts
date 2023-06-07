import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/posts/post.module';
import { NotionService } from './modules/notion/notion.service';
import { SlidersModule } from './modules/sliders/sliders.module';
import { TagsModule } from './modules/tags/tags.module';
import { BlocksModule } from './modules/blocks/blocks.module';
import { NotionController } from './modules/notion/notion.controller';
import { RouterModule } from '@nestjs/core';
import { adminRoutes } from './admin.routes';
import { NotionModule } from './modules/notion/notion.module';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [NotionController],
  providers: [NotionService],
  imports: [
    ConfigModule.forRoot(),
    RouterModule.register(adminRoutes),
    BullModule.forRoot({
      redis: {
        username: process.env.REDIS_USER,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASS,
        port: parseInt(process.env.REDIS_PORT),
        db: parseInt(process.env.REDIS_DB),
      },
      defaultJobOptions: {
        removeOnComplete: true,
      },
    }),
    UserModule,
    AuthModule,
    PostModule,
    SlidersModule,
    TagsModule,
    BlocksModule,
    NotionModule,
  ],
})
export class AdminModule {}
