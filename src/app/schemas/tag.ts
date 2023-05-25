import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TagDocument = HydratedDocument<TagModel>;

@Schema()
export class TagModel {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  color: string;
}

export const TagSchema = SchemaFactory.createForClass(TagModel);
