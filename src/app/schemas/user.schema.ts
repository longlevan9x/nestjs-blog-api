import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

@Schema()
export class UserModel {
  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop()
  email?: string;

  @Prop({
    type: Number,
    required: false,
    default: 1,
  })
  tokenVersion?: number;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
