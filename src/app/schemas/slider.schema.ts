import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

@Schema()
export class SliderModel {
  @Prop({ _id: false })
  _id: string;

  @Prop({ required: true, unique: true, type: String })
  id: string;

  @Prop()
  created_time: string;

  @Prop()
  last_edited_time: string;

  @Prop()
  title: string;

  @Prop({ required: false })
  cover?: string;

  @Prop(
    raw({
      start: { type: String },
      end: { type: String },
      time_zone: { type: String },
    }),
  )
  published: Record<any, any>;

  @Prop([
    raw({
      id: { type: String },
      name: { type: String },
      avatar_url: { type: String },
      type: { type: String },
    }),
  ])
  authors: Record<any, any>[];

  @Prop()
  description: string;

  @Prop()
  status: string;

  @Prop()
  language: string;

  @Prop()
  archived: boolean;

  @Prop(
    raw({
      url: String,
      expiry_time: String,
    }),
  )
  files: Record<any, any>[];
}

export type SliderDocument = HydratedDocument<SliderModel>;

export const SliderSchema = SchemaFactory.createForClass(SliderModel);
