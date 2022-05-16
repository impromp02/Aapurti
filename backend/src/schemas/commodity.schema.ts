import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() 
export class Commodity {
  @Prop()
  name: string;

  @Prop()
  measuringUnit: "g" | "kg" | "ml" | "l" | "unit";

  @Prop()
  rate: number;

  @Prop()
  category: "grocery" | "stationery";
}
export type CommodityDocument = Commodity & Document;
export const CommoditySchema = SchemaFactory.createForClass(Commodity);