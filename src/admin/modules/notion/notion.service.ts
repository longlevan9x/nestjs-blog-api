import { Injectable, Logger } from '@nestjs/common';
import { Client } from '@notionhq/client';
import * as dateFns from 'date-fns';
import { ConfigService } from '@nestjs/config';
import * as process from 'process';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

@Injectable()
export class NotionService {
  private readonly _notion: Client;
  private readonly logger = new Logger(NotionService.name);

  constructor(private configService: ConfigService) {
    this._notion = new Client({
      auth: process.env.NOTION_API_TOKEN,
    });
  }

  get notion(): Client {
    return this._notion;
  }

  queryDatabase(query: { start_cursor?: string }) {
    return this._notion.databases.query({
      ...{ database_id: process.env.NOTION_POST_DATABASE_ID },
      ...query,
    });
  }

  getDatabase(databaseId: string) {
    return this._notion.databases.retrieve({ database_id: databaseId });
  }

  getPostTags() {
    return this.getDatabase(process.env.NOTION_POST_DATABASE_ID).then(
      (result) => {
        return this.getProperties(result.properties?.tags, true)?.options || [];
      },
    );
  }

  getPostsRaw() {
    return this._notion.databases.query({
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
      sorts: [
        {
          timestamp: 'last_edited_time',
          direction: 'descending',
        },
      ],
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

    const formattedDate = dateFns.format(Date.now(), 'yyyy-MM-dd');

    return this._notion.databases
      .query({
        database_id: process.env.NOTION_POST_DATABASE_ID,
        filter: {
          timestamp: 'last_edited_time',
          last_edited_time: {
            on_or_after: formattedDate,
          },
        },
        sorts: [
          {
            timestamp: 'last_edited_time',
            direction: 'descending',
          },
        ],
      })
      .then((response) => this.convertNotionDatabaseToPosts(response.results));
  }

  async convertNotionDatabaseToPosts(posts: any) {
    const promises = posts.map((post: any) => {
      // const mdblocks = await n2m.pageToMarkdown(post.id);
      // const mdString = n2m.toMarkdownString(mdblocks);
      //
      // const {minutes} = readingTime(mdString);
      try {
        return {
          id: post.id,
          title: this.getProperties(post.properties.title)?.content ?? null,
          cover: this.getProperties(post.cover)?.url ?? null,
          published: this.getProperties(post.properties.published) ?? null,
          slug: this.getProperties(post.properties.slug)?.content,
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
          archived: post.archived,
        };
      } catch (e) {
        this.logger.error(e.stack);
        return null;
      }
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
      return await this._notion.pages.retrieve({ page_id: id });
    } catch (error) {
      throw new Error(`Failed to retrieve page with ID ${error.message}`);
    }
  }

  async getPageProperty({
    page_id,
    property_id,
  }: {
    page_id: string;
    property_id: string;
  }) {
    return this._notion.pages.properties.retrieve({ page_id, property_id });
  }

  async getBlock(id) {
    try {
      return await this._notion.blocks.children.list({ block_id: id });
    } catch (error) {
      throw new Error(`Failed to retrieve page with ID ${error.message}`);
    }
  }

  getSliders() {
    const formattedDate = dateFns.format(Date.now(), 'yyyy-MM-dd');

    return this._notion.databases
      .query({
        database_id: process.env.NOTION_SLIDER_DATABASE_ID,
        // filter: {
        //   timestamp: 'last_edited_time',
        //   last_edited_time: {
        //     on_or_after: formattedDate,
        //   },
        // },
      })
      .then((response) =>
        this.convertNotionDatabaseToSliders(response.results),
      );
  }

  convertNotionDatabaseToSliders(sliders: any[]) {
    return sliders.map((slider: any) => {
      try {
        return {
          id: slider.id,
          title: this.getProperties(slider.properties.title)?.content ?? null,
          published: this.getProperties(slider.properties.published) ?? null,
          authors: this.getProperties(slider.properties.authors, true),
          description:
            this.getProperties(slider.properties.description)?.content || null,
          language: this.getProperties(slider.properties.language)?.name,
          created_time: slider.created_time,
          last_edited_time: slider.last_edited_time,
          url: slider.url,
          status: this.getProperties(slider.properties.status).name,
          archived: slider.archived,
          files: this.getProperties(slider.properties.file, true) || null,
        };
      } catch (e) {
        this.logger.error(e.stack);
        return null;
      }
    });
  }
}
