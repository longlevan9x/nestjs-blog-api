import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlockModel } from '../schemas/block.schema';

export class BlockRepository {
  constructor(
    @InjectModel(BlockModel.name) private blockModel: Model<BlockModel>,
  ) {}

  getList(pageId: string) {
    return this.blockModel.find({ 'parent.page_id': pageId });
  }

  bulkCreateOrUpdate(blocks: any[]) {
    const bulkOps = blocks
      .filter((m) => m)
      .map((m) => {
        return {
          updateOne: {
            filter: {
              id: m.id,
            },
            update: m,
            upsert: true,
          },
        };
      });

    return this.blockModel.bulkWrite(bulkOps);
  }
}
