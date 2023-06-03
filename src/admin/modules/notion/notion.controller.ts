import { Controller, Get, Param } from '@nestjs/common';
import { NotionService } from './notion.service';

@Controller()
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Get(':id/blocks')
  retrieveBlock(@Param('id') id: string) {
    return this.notionService.getBlock(id);
  }

  @Get(':id')
  retrievePage(@Param('id') id: string) {
    return this.notionService.getPageDetailById(id);
  }
}
