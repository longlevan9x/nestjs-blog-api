import { InjectModel } from '@nestjs/mongoose';
import { PostModel } from '../schemas/post.schema';
import { Model } from 'mongoose';

export class PostRepository {
  constructor(
    @InjectModel(PostModel.name) private postMode: Model<PostModel>,
  ) {}

  findOne(filter) {
    return this.postMode.findOne(filter);
  }

  findByIdNotDeleted(id) {
    return this.findOne({ id, deleted: false });
  }

  findById(id: string) {
    return this.postMode.findOne({ id });
  }

  findAll(filter = {}) {
    return this.postMode.find(filter);
  }

  bulkCreateOrUpdate(posts: any[]) {
    const bulkOps = posts.map((p) => {
      return {
        updateOne: {
          filter: { id: p.id },
          update: p,
          upsert: true,
        },
      };
    });

    return this.postMode.bulkWrite(bulkOps);
  }
}
