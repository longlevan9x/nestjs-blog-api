import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(@Query() query) {
    return this.postService.findAll(query);
  }

  @Get('/ids')
  findAllId() {
    return this.postService.findAllId();
  }

  @Get('/:id/content')
  async getContent(@Param('id') id: string, @Query() query) {
    return this.postService.getPostContent(id).then((result) => result.html);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }
}
