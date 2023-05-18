import { InjectModel } from '@nestjs/mongoose';
import { PostModel } from '../schemas/post.schema';
import { Model } from 'mongoose';

export class PostRepository {
  constructor(
    @InjectModel(PostModel.name) private postMode: Model<PostModel>,
  ) {}

  findOne(id: string) {
    return this.postMode.findOne({ id });
  }

  findAll(filter = {}) {
    return this.postMode.find(filter).sort({ title: 1 });
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
