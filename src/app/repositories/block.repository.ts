import { InjectModel } from '@nestjs/mongoose';
import { PostModel } from '../schemas/post.schema';
import { Model } from 'mongoose';
import { BlockModel } from '../schemas/block.schema';

export class BlockRepository {
  constructor(
    @InjectModel(BlockModel.name) private blockModel: Model<BlockModel>,
  ) {}

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
