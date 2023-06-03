import { Injectable, Logger } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SlackService {
  private readonly logger = new Logger(SlackService.name);
  private readonly slackClient: WebClient;

  constructor() {
    this.slackClient = new WebClient(
      'xoxb-5315556246839-5370718819940-U22KYUi91cxckcJ70PALEWWp',
    );
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async sendMessage(): Promise<void> {
    const channel = 'notion';
    const message = 'Hello from NestJS to Slack!';
    try {
      await this.slackClient.chat.postMessage({
        channel,
        text: message,
      });
      console.log('Tin nhắn đã được gửi thành công!');
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
    }
  }
}
