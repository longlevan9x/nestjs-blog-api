import { Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotionPageToHtml } from 'notion-page-to-html/dist/main/use-cases/notion-api-to-html';
import { PostRepository } from 'src/app/repositories/post.repository';
import { PostConstant } from 'src/app/constants/post.constant';
import { NotionService } from '../notion/notion.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectQueue('block') private readonly blockQueue: Queue,
    private postRepository: PostRepository,
    private readonly notionService: NotionService,
  ) {}

  // @Cron('* * * * * *')
  @Cron(CronExpression.EVERY_MINUTE)
  async fetchPostsFromNotion() {
    this.logger.debug('Called when the current second is EVERY_MINUTE');

    try {
      const posts = await this.notionService.getPosts();
      const rs = await this.postRepository.bulkCreateOrUpdate(posts);

      for (const postKey in posts) {
        await this.blockQueue.add(
          'updateBlocks',
          { id: posts[postKey].id },
          { delay: parseInt(postKey) * 1000 },
        );
      }

      this.logger.log('fetchPostsFromNotion s ' + JSON.stringify(rs));
    } catch (e) {
      this.logger.error('fetchPostsFromNotion e', e.stack);
    }
  }

  // @Cron(CronExpression.EVERY_SECOND)
  // async test() {
  //   this.logger.log(23444);
  //   await this.blockQueue.add('updateBlocks', { id: '234' });
  // }
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

  getPostsRaw() {
    return this.notionService.getPostsRaw();
  }
}
