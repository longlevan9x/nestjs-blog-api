import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { WebsiteModule } from './website/website.module';
import { SlackModule } from './notification/slack/slack.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    // MongooseModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URI'),
    //   }),
    // }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AdminModule,
    WebsiteModule,
    SlackModule,
  ],
})
export class AppModule {}
