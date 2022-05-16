import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Commodity } from './commodity.schema';
import { User } from './user.schema';
import { Organisation } from './organisation.schema';
import { Vendor } from './vendor.schema';

@Schema()
export class Order {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Commodity' }] })
  commodities: Commodity[];

  @Prop()
  orderedOn: mongoose.Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organisation' })
  orderedBy: Organisation;

  @Prop()
  orderExpectedBy: mongoose.Date;

  @Prop()
  deliveredOn: mongoose.Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  deliveryBy: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' })
  vendor: Vendor;

  @Prop()
  recieving: string; //TODO: Has to store the pdf. So it should be binary

  @Prop()
  invoice: string; //TODO: Has to store the pdf. So it should be binary

  @Prop()
  status: 'assigned' | 'transit' | 'delivered' | 'cancelled';
}
export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
