import { Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Cron } from '@nestjs/schedule';
import { NotionPageToHtml } from 'notion-page-to-html/dist/main/use-cases/notion-api-to-html';
import { PostRepository } from 'src/app/repositories/post.repository';
import { PostConstant } from 'src/app/constants/post.constant';
import { NotionService } from '../notion/notion.service';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    private postRepository: PostRepository,
    private readonly notionService: NotionService,
  ) {}

  @Cron('*/5 * * * * *')
  async fetchPostsFromNotion() {
    this.logger.debug('Called when the current second is 5');

    try {
      const posts = await this.notionService.getPosts();
      const rs = await this.postRepository.bulkCreateOrUpdate(posts);
      console.log('PostService.fetchPostsFromNotion s', rs);
    } catch (e) {
      console.log('PostService.fetchPostsFromNotion e', e);
    }
  }

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return this.postRepository.findAll({
      status: PostConstant.STATUS.PUBLISHED,
    });
  }

  findOne(id: string) {
    return this.postRepository.findById(id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  async getPostContent(id: string) {
    const post = await this.postRepository.findById(id);
    const url = post.url.replace(
      'https://www.notion.so/',
      'https://kivie.notion.site/',
    );

    return NotionPageToHtml.convert(url, {
      // bodyContentOnly: true,
      excludeHeaderFromBody: true,
    }).then((result) => {
      return {
        html: result.html,
        title: result.title,
      };
    });
  }
}
