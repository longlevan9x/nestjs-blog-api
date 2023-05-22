import { Module } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { SlidersController } from './sliders.controller';
import { SliderRepository } from '../../app/repositories/slider.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { SliderModel, SliderSchema } from '../../app/schemas/slider.schema';

@Module({
  controllers: [SlidersController],
  providers: [SlidersService, SliderRepository],
  imports: [
    MongooseModule.forFeature([
      { name: SliderModel.name, schema: SliderSchema },
    ]),
  ],
})
export class SlidersModule {}
