import { Injectable, Logger } from '@nestjs/common';
import { CreateSliderDto } from './dto/create-slider.dto';
import { UpdateSliderDto } from './dto/update-slider.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotionService } from '../notion/notion.service';
import { SliderRepository } from '../../../app/repositories/slider.repository';
import { PostConstant } from '../../../app/constants/post.constant';

@Injectable()
export class SlidersService {
  private readonly logger = new Logger(SlidersService.name);

  constructor(
    private readonly notionService: NotionService,
    private sliderRepository: SliderRepository,
  ) {}

  create(createSliderDto: CreateSliderDto) {
    return 'This action adds a new slider';
  }

  findAll() {
    return this.sliderRepository.findAll({
      status: PostConstant.STATUS.PUBLISHED,
    });
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

  @Cron(CronExpression.EVERY_30_SECONDS)
  async fetchPostsFromNotion() {
    this.logger.debug('Called when the current second is EVERY_30_SECONDS');
    try {
      const sliders = await this.notionService.getSliders();
      const rs = await this.sliderRepository.bulkCreateOrUpdate(sliders);
      this.logger.log('fetchPostsFromNotion s ' + JSON.stringify(rs));
    } catch (e) {
      this.logger.error('fetchPostsFromNotion e', e.stack);
    }
  }
}
