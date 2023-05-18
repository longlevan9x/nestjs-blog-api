import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';
import { ScheduleModule } from '@nestjs/schedule';
import { WebsiteModule } from './website/website.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './app/guards/jwt-auth.guard';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      // isGlobal: true,
      ignoreEnvFile: false,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AdminModule,
    WebsiteModule,
  ],
})
export class AppModule {}
