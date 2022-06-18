import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsGateway } from './products.gateway';
import { ProductsController } from './products.controller';

@Module({
  providers: [ProductsGateway, ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
