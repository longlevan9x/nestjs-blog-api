import { Test, TestingModule } from '@nestjs/testing';
import { SlackNotificationService } from './slack-notification.service';

describe('SlackNotificationService', () => {
  let service: SlackNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlackNotificationService],
    }).compile();

    service = module.get<SlackNotificationService>(SlackNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
