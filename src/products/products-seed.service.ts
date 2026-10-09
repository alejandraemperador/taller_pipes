import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async onModuleInit(): Promise<void> {
    // Keep the user's changes on subsequent restarts.
    if ((await this.productsRepository.count()) > 0) return;

    const products = this.productsRepository.create([
      { name: 'Notebook', category: 'office', stock: 12, status: 'active' },
      { name: 'Mouse', category: 'electronics', stock: 5, status: 'active' },
      { name: 'Keyboard', category: 'electronics', stock: 0, status: 'inactive' },
    ]);
    await this.productsRepository.save(products);
  }
}
