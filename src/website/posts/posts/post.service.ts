import { Injectable } from '@nestjs/common';
import { PostRepository } from '../../../app/repositories/post.repository';
import { PostConstant } from '../../../app/constants/post.constant';
import { NotionPageToHtml } from 'notion-page-to-html/dist/main/use-cases/notion-api-to-html';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  findAll() {
    return this.postRepository.findAll({
      status: PostConstant.STATUS.PUBLISHED,
    });
  }

  findOne(id: string) {
    return this.postRepository.findOne(id);
  }

  async getPostContent(id: string) {
    const post = await this.postRepository.findOne(id);
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
        console.log(error);
        return {
          html: '',
          title: '',
        };
      });
  }
}
