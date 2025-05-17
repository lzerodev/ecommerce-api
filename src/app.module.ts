import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './db/data-source-cli';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [
    UsersModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
