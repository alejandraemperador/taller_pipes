import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductsQueryDto } from './dto/filter-products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductRulesService } from './product-rules.service';

// Already implemented. This exercise does not require changing the repository logic.
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
    private readonly productRulesService: ProductRulesService,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const product = this.productsRepository.create({
      name: dto.name,
      category: dto.category,
      stock: dto.stock,
      status: 'active',
    });
    return this.productsRepository.save(product);
  }

  async findFiltered(query: FilterProductsQueryDto): Promise<ProductEntity[]> {
    return this.productsRepository.find({
      where: query.category ? { category: query.category } : {},
      order: { id: 'ASC' },
      take: query.limit ?? 5,
    });
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} was not found`);
    }
    return product;
  }

  async update(id: number, dto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.findOne(id);
    this.productRulesService.ensureCanBeUpdated(product);
    this.productsRepository.merge(product, dto);
    return this.productsRepository.save(product);
  }
}
