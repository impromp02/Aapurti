import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  role: 'valet' | 'warden' | 'admin';

  @Prop()
  isActive: boolean;

  @Prop()
  avatar: string;

  @Prop()
  mobile: number;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
