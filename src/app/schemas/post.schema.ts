import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type PostDocument = HydratedDocument<PostModel>;

@Schema()
export class PostModel {
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

  @Prop()
  cover: string;

  @Prop(
    raw({
      start: { type: String },
      end: { type: String },
      time_zone: { type: String },
    }),
  )
  published: Record<any, any>;

  @Prop()
  slug: string;

  @Prop([String])
  tags: string[];

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
  views: string;

  @Prop()
  status: string;

  @Prop()
  language: string;

  @Prop()
  url: string;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
