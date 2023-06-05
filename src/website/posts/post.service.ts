import { Injectable, Logger } from '@nestjs/common';
import { PostRepository } from '../../app/repositories/post.repository';
import { PostConstant } from '../../app/constants/post.constant';
import { NotionPageToHtml } from 'notion-page-to-html/dist/main/use-cases/notion-api-to-html';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(private postRepository: PostRepository) {}

  findAll(query?: any) {
    const limit = query.limit;
    const filter: any = {
      status: PostConstant.STATUS.PUBLISHED,
      archived: false,
    };

    if (query.keyword) {
      filter.title = {
        $regex: new RegExp(query.keyword, 'gi'),
      };
    }

    let _query = this.postRepository.findAll(filter).sort({ title: 1 });

    if (limit) {
      _query = _query.limit(limit);
    }

    return _query;
  }

  findOne(id: string) {
    return this.postRepository.findByIdNotDeleted(id);
  }

  async getPostContent(id: string) {
    const post = await this.postRepository.findByIdNotDeleted(id);
    const url = post.url.replace(
      'https://www.notion.so/',
      'https://kivie.notion.site/',
    );

    return NotionPageToHtml.convert(url, {
      bodyContentOnly: true,
      // excludeHeaderFromBody: true,
      // excludeTitleFromHead: true,
      // excludeMetadata: true,
      // excludeCSS: true
    })
      .then((result) => {
        return {
          html: result.html,
          title: result.title,
        };
      })
      .catch((error) => {
        this.logger.error('getPostContent', error.stack);
        return {
          html: '',
          title: '',
        };
      });
  }
}
