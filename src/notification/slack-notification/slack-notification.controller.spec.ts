import { Test, TestingModule } from '@nestjs/testing';
import { SlackNotificationController } from './slack-notification.controller';

describe('SlackNotificationController', () => {
  let controller: SlackNotificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlackNotificationController],
    }).compile();

    controller = module.get<SlackNotificationController>(SlackNotificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
