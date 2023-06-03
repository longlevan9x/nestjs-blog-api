import { Module } from '@nestjs/common';
import { SlackNotificationService } from './slack-notification.service';
import { SlackNotificationController } from './slack-notification.controller';

@Module({
  providers: [SlackNotificationService],
  controllers: [SlackNotificationController],
  imports: [],
})
export class SlackNotificationModule {}
