import { Controller, Get } from '@nestjs/common';
import { NotionService } from './notion.service';

@Controller()
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Get()
  retrievePage() {}
}
