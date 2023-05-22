import { InjectModel } from '@nestjs/mongoose';
import { SliderModel } from '../schemas/slider.schema';
import { Model } from 'mongoose';

export class SliderRepository {
  constructor(
    @InjectModel(SliderModel.name) private sliderModel: Model<SliderModel>,
  ) {}

  findOne(filter) {
    return this.sliderModel.findOne(filter);
  }

  findByIdNotDeleted(id) {
    return this.findOne({ id, deleted: false });
  }

  findById(id: string) {
    return this.sliderModel.findOne({ id });
  }

  findAll(filter = {}) {
    return this.sliderModel.find(filter);
  }

  bulkCreateOrUpdate(sliders: any[]) {
    const bulkOps = sliders
      .filter((p) => p)
      .map((p) => {
        return {
          updateOne: {
            filter: {
              id: p.id,
            },
            update: p,
            upsert: true,
          },
        };
      });

    return this.sliderModel.bulkWrite(bulkOps);
  }
}
