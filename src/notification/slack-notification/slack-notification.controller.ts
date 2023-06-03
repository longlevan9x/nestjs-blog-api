import { Controller, Get } from '@nestjs/common';
import { SlackNotificationService } from './slack-notification.service';

@Controller('slack-notification')
export class SlackNotificationController {
  constructor(private slackNotificationService: SlackNotificationService) {}

  @Get()
  async test() {
    return '';
  }
}
