import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TagModel } from '../schemas/tag';

export class TagRepository {
  constructor(@InjectModel(TagModel.name) private tagModel: Model<TagModel>) {}

  findAll() {
    return this.tagModel.find();
  }

  removeAll() {
    return this.tagModel.deleteMany({});
  }

  insertMany(tags) {
    return this.tagModel.insertMany(tags);
  }
}
