import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Vendor {
  @Prop()
  name: string;

  @Prop()
  mobile: string;

  @Prop()
  address: string;

  @Prop()
  coordinates: string;
}

export type VendorDocument = Vendor & Document;
export const VendorSchema = SchemaFactory.createForClass(Vendor);
