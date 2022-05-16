import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Organisation {
  @Prop()
  name: string;

  @Prop()
  block: string;

  @Prop()
  district: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  warden: User;
}
export type OrganisationDocument = Organisation & Document;
export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
