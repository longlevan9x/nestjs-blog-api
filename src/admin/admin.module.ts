import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PostModule } from './modules/posts/post.module';
import { NotionService } from './modules/notion/notion.service';
import { SlidersModule } from './modules/sliders/sliders.module';

@Module({
  controllers: [],
  providers: [NotionService],
  imports: [UserModule, AuthModule, PostModule, SlidersModule],
})
export class AdminModule {}
