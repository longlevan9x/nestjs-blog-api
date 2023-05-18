import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import * as process from 'process';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { response } from 'express';

@Injectable()
export class NotionService {
  private readonly notion: Client;

  constructor() {
    this.notion = new Client({
      auth: process.env.NOTION_API_TOKEN,
    });
  }

  getPosts({ filter = {}, sort = {} } = {}) {
    const _filter: any = Object.entries(filter).map(
      ([key, value]: [string, any]) => {
        return {
          property: key,
          ...value,
        };
      },
    );

    const _sorts = Object.entries(sort).map(([key, value]: [string, any]) => {
      return {
        property: key,
        direction: value,
      };
    });

    return this.notion.databases
      .query({
        database_id: process.env.NOTION_POST_DATABASE_ID,
        // filter: {
        //   and: [
        //     {
        //       property: 'status',
        //       status: {
        //         equals: 'Published',
        //       },
        //     },
        //     {
        //       property: 'published',
        //       date: { before: new Date().toISOString() },
        //     },
        //     ..._filter,
        //   ],
        // },
        // sorts: [
        //   ..._sorts,
        //   {
        //     property: 'published',
        //     direction: 'descending',
        //   },
        // ],
      })
      .then((response) => this.convertNotionDatabaseToPosts(response.results));
  }

  async convertNotionDatabaseToPosts(posts: any) {
    const promises = posts.map((post: any) => {
      // const mdblocks = await n2m.pageToMarkdown(post.id);
      // const mdString = n2m.toMarkdownString(mdblocks);
      //
      // const {minutes} = readingTime(mdString);

      return {
        id: post.id,
        title: this.getProperties(post.properties.title)?.content ?? null,
        cover: this.getProperties(post.cover)?.url ?? null,
        published: this.getProperties(post.properties.published) ?? null,
        slug: this.getProperties(post.properties.slug).content,
        tags:
          this.getProperties(post.properties.tags, true).map(
            (x: any) => x.name,
          ) || [],
        authors: this.getProperties(post.properties.authors, true),
        description: this.getProperties(post.properties.description).content,
        featured: this.getProperties(post.properties.featured),
        // readingTime: Math.ceil(minutes),
        views: this.getProperties(post.properties.views),
        language: this.getProperties(post.properties.language)?.name,
        created_time: post.created_time,
        last_edited_time: post.last_edited_time,
        url: post.url,
        status: this.getProperties(post.properties.status).name,
      };
    });

    return Promise.all(promises);
  }

  getProperties(param: any, isGetAllArray = false): any {
    if (!param) {
      return null;
    } else if (
      param &&
      param instanceof Object &&
      'object' in param &&
      param.object === 'user'
    ) {
      return param;
    } else if (param && param instanceof Object && 'type' in param) {
      return this.getProperties(param[param.type], isGetAllArray);
    } else if (param && param instanceof Array) {
      if (isGetAllArray) {
        return param.map((item: any) =>
          this.getProperties(item, isGetAllArray),
        );
      } else {
        return this.getProperties(param[0], isGetAllArray);
      }
    } else {
      return param;
    }
  }

  async getPageDetailById(id: string): Promise<any> {
    try {
      return await this.notion.pages.retrieve({ page_id: id });
    } catch (error) {
      throw new Error(`Failed to retrieve page with ID ${error.message}`);
    }
  }

  async getBlock(id) {
    try {
      return await this.notion.blocks.children.list({ block_id: id });
    } catch (error) {
      throw new Error(`Failed to retrieve page with ID ${error.message}`);
    }
  }
}
