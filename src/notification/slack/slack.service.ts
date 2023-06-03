import { Injectable, Logger } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotionService } from '../../admin/modules/notion/notion.service';
import { PropertyItemObjectResponse } from '@notionhq/client/build/src/api-endpoints';

/**
 * Local map to store task pageId to its last status.
 * { [pageId: string]: string }
 */
const taskPageIdToStatusMap = {};

@Injectable()
export class SlackService {
  private readonly logger = new Logger(SlackService.name);
  private readonly slackClient: WebClient;

  constructor(private notionService: NotionService) {
    this.slackClient = new WebClient(
      'xoxb-5315556246839-5370718819940-U22KYUi91cxckcJ70PALEWWp',
    );

    // this.setInitialTaskPageIdToStatusMap();
  }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  async sendMessage(): Promise<void> {
    const channel = 'notion';
    const message = 'Hello from NestJS to Slack!';
    try {
      await this.slackClient.chat.postMessage({
        channel,
        text: message,
      });
      console.log('Tin nhắn đã được gửi thành công!');
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
    }
  }

  /**
   * Get and set the initial data store with tasks currently in the database.
   */
  async setInitialTaskPageIdToStatusMap() {
    const currentTasks = await this.getTasksFromNotionDatabase();
    for (const { pageId, status } of currentTasks) {
      taskPageIdToStatusMap[pageId] = status;
    }
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  async findAndSendEmailsForUpdatedTasks() {
    // Get the tasks currently in the database.
    console.log('Fetching tasks from Notion DB...');
    const currentTasks = await this.getTasksFromNotionDatabase();

    // Return any tasks that have had their status updated.
    const updatedTasks = this.findUpdatedTasks(currentTasks);
    console.log(`Found ${updatedTasks.length} updated tasks.`);

    // For each updated task, update taskPageIdToStatusMap and send an email notification.
    for (const task of updatedTasks) {
      taskPageIdToStatusMap[task.pageId] = task.status;
      // send to slack
      console.log('task', task);
    }
  }

  /**
   * Gets tasks from the database.
   */
  async getTasksFromNotionDatabase(): Promise<
    Array<{ pageId: string; status: string; title: string }>
  > {
    const pages = [];
    let cursor = undefined;

    const shouldContinue = true;
    while (shouldContinue) {
      const { results, next_cursor } = await this.notionService.queryDatabase({
        start_cursor: cursor,
      });
      pages.push(...results);
      if (!next_cursor) {
        break;
      }
      cursor = next_cursor;
    }
    console.log(`${pages.length} pages successfully fetched.`);

    const tasks = [];
    for (const page of pages) {
      const pageId = page.id;

      const statusPropertyId = page.properties['status'].id;
      const statusPropertyItem = await this.getPropertyValue({
        pageId,
        propertyId: statusPropertyId,
      });

      const status = this.getStatusPropertyValue(statusPropertyItem);

      const titlePropertyId = page.properties['title'].id;
      const titlePropertyItems = await this.getPropertyValue({
        pageId,
        propertyId: titlePropertyId,
      });
      const title = this.getTitlePropertyValue(titlePropertyItems);

      tasks.push({ pageId, status, title });
    }

    return tasks;
  }

  /**
   * Extract status as string from property value
   */
  getStatusPropertyValue(
    property: PropertyItemObjectResponse | Array<PropertyItemObjectResponse>,
  ): string {
    if (Array.isArray(property)) {
      if (property?.[0]?.type === 'select') {
        return property[0].select.name;
      } else {
        return 'No Status';
      }
    } else {
      if (property.type === 'select') {
        return property.select.name;
      } else {
        return 'No Status';
      }
    }
  }

  /**
   * Extract title as string from property value
   */
  getTitlePropertyValue(
    property: PropertyItemObjectResponse | Array<PropertyItemObjectResponse>,
  ): string {
    if (Array.isArray(property)) {
      if (property?.[0].type === 'title') {
        return property[0].title.plain_text;
      } else {
        return 'No Title';
      }
    } else {
      if (property.type === 'title') {
        return property.title.plain_text;
      } else {
        return 'No Title';
      }
    }
  }

  /**
   * Compares task to most recent version of task stored in taskPageIdToStatusMap.
   * Returns any tasks that have a different status than their last version.
   */
  findUpdatedTasks(
    currentTasks: Array<{ pageId: string; status: string; title: string }>,
  ): Array<{ pageId: string; status: string; title: string }> {
    return currentTasks.filter((currentTask) => {
      const previousStatus = this.getPreviousTaskStatus(currentTask);
      return currentTask.status !== previousStatus;
    });
  }

  /**
   * Finds or creates task in local data store and returns its status.
   */
  getPreviousTaskStatus({ pageId, status }): string {
    // If this task hasn't been seen before, add to local pageId to status map.
    if (!taskPageIdToStatusMap[pageId]) {
      taskPageIdToStatusMap[pageId] = status;
    }
    return taskPageIdToStatusMap[pageId];
  }

  /**
   * If property is paginated, returns an array of property items.
   *
   * Otherwise, it will return a single property item.
   */
  async getPropertyValue({
    pageId,
    propertyId,
  }: {
    pageId: string;
    propertyId: string;
  }): Promise<PropertyItemObjectResponse | Array<PropertyItemObjectResponse>> {
    let propertyItem = await this.notionService.getPageProperty({
      page_id: pageId,
      property_id: propertyId,
    });

    if (propertyItem.object === 'property_item') {
      return propertyItem;
    }

    // Property is paginated.
    let nextCursor = propertyItem.next_cursor;
    const results = propertyItem.results;

    while (nextCursor !== null) {
      propertyItem = await this.notionService.getProperties({
        page_id: pageId,
        property_id: propertyId,
        start_cursor: nextCursor,
      });

      if (propertyItem.object === 'list') {
        nextCursor = propertyItem.next_cursor;
        results.push(...propertyItem.results);
      } else {
        nextCursor = null;
      }
    }

    return results;
  }
}
