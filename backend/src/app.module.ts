import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { CommodityModule } from './commodity/commodity.module';
import { OrganistationModule } from './organistation/organistation.module';
import { VendorModule } from './vendor/vendor.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL as string),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
