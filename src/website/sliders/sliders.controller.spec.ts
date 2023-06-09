import { Test, TestingModule } from '@nestjs/testing';
import { SlidersController } from './sliders.controller';
import { SlidersService } from './sliders.service';

describe('SlidersController', () => {
  let controller: SlidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlidersController],
      providers: [SlidersService],
    }).compile();

    controller = module.get<SlidersController>(SlidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
