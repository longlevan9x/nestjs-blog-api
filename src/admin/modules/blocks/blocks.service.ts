import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { NotionService } from '../notion/notion.service';

@Injectable()
export class BlocksService {
  constructor(private notionService: NotionService) {}

  create(createBlockDto: CreateBlockDto) {
    return 'This action adds a new block';
  }

  findAll(pageId: string) {
    return this.notionService.getBlock(pageId);
  }

  findOne(id: number) {
    return `This action returns a #${id} block`;
  }

  update(id: number, updateBlockDto: UpdateBlockDto) {
    return `This action updates a #${id} block`;
  }

  remove(id: number) {
    return `This action removes a #${id} block`;
  }
}
