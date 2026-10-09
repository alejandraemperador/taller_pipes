import { ConflictException, Injectable } from '@nestjs/common';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductRulesService {
  ensureCanBeUpdated(product: ProductEntity): void {
    if (product.status !== 'active') {
      throw new ConflictException('Only active products can be updated');
    }
  }
}
