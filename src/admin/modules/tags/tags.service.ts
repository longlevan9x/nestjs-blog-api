import { Injectable, Logger } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotionService } from '../notion/notion.service';
import { TagRepository } from '../../../app/repositories/tag.repository';

@Injectable()
export class TagsService {
  private readonly logger = new Logger(TagsService.name);

  constructor(
    private tagRepository: TagRepository,
    private readonly notionService: NotionService,
  ) {}

  create(createTagDto: CreateTagDto) {
    return 'This action adds a new tag';
  }

  findAll() {
    return `This action returns all tags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }

  @Cron('45 * * * * *')
  async fetchTagsFromNotion() {
    try {
      const tags = await this.notionService.getPostTags();
      await this.tagRepository.removeAll();
      const rs = await this.tagRepository.insertMany(tags);
      this.logger.log('fetchPostsFromNotion s ' + JSON.stringify(rs));
    } catch (e) {
      this.logger.error('fetchPostsFromNotion e', e.stack);
    }
  }
}
