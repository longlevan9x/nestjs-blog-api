import { Injectable } from '@nestjs/common';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { SliderConstant } from '../../app/constants/post.constant';
import { SliderRepository } from '../../app/repositories/slider.repository';

@Injectable()
export class SlidersService {
  constructor(private sliderRepository: SliderRepository) {}

  create(createSliderDto: CreateSliderDto) {
    return 'This action adds a new slider';
  }

  findAll() {
    return this.sliderRepository
      .findAll({
        status: SliderConstant.STATUS.PUBLISHED,
        archived: false,
      })
      .sort({ title: 1 });
  }

  findOne(id: number) {
    return `This action returns a #${id} slider`;
  }

  update(id: number, updateSliderDto: UpdateSliderDto) {
    return `This action updates a #${id} slider`;
  }

  remove(id: number) {
    return `This action removes a #${id} slider`;
  }
}
