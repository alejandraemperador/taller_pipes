import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { requestValidationPipe } from '../common/request-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductsQueryDto } from './dto/filter-products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // TODO 1: Implement the create method for POST /api/products here.
  // Define the route, receive a validated CreateProductDto in the body,
  // and return the result of productsService.create(dto).
  // The service is already implemented. Do not add repository or business logic.

  @Post()
  create(@Body(requestValidationPipe) dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  findFiltered(
    // TODO 3: Apply requestValidationPipe to the complete query DTO.
    @Query(requestValidationPipe) query: FilterProductsQueryDto,
  ) {
    return this.productsService.findFiltered(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // Already completed: use it to inspect products and compare their state.
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    // TODO 2: Use ParseIntPipe here and remove the manual Number conversion.
    @Param('id', ParseIntPipe) id: number,
    // TODO 2: Apply requestValidationPipe to this body.
    @Body(requestValidationPipe) dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }
}
