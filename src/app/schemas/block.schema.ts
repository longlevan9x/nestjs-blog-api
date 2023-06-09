import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type BlockDocument = HydratedDocument<BlockModel>;

@Schema()
export class BlockModel {
  @Prop({ _id: false })
  _id: string;

  @Prop({ required: true, unique: true, type: String })
  id: string;

  @Prop(
    raw({
      type: {
        type: String,
      },
      page_id: {
        type: String,
      },
    }),
  )
  parent: Record<any, any>;

  @Prop()
  created_time: string;
  @Prop()
  last_edited_time: string;

  @Prop()
  type: string;

  @Prop()
  has_children: boolean;
  @Prop()
  archived: boolean;

  @Prop({ type: SchemaTypes.Mixed })
  bookmark: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  breadcrumb: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  bulleted_list_item: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  callout: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  child_database: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  child_page: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  column: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  column_list: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  divider: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  embed: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  equation: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  file: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  heading_1: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  heading_2: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  heading_3: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  image: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  link_preview: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  link_to_page: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  numbered_list_item: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  paragraph: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  pdf: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  quote: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  synced_block: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  table: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  table_of_contents: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  table_row: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  template: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  to_do: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  toggle: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  unsupported: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  video: Record<any, any>;

  @Prop({ type: SchemaTypes.Mixed })
  code: Record<any, any>;
}

export const BlockSchema = SchemaFactory.createForClass(BlockModel);
