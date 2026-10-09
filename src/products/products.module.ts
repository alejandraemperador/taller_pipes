import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductRulesService } from './product-rules.service';
import { ProductsController } from './products.controller';
import { ProductsSeedService } from './products-seed.service';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductRulesService, ProductsSeedService],
})
export class ProductsModule {}
