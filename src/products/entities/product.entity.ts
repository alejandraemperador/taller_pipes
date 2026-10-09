import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 60 })
  name!: string;

  @Column({ length: 20 })
  category!: 'office' | 'electronics';

  @Column({ type: 'int', default: 0 })
  stock!: number;

  @Column({ length: 20, default: 'active' })
  status!: 'active' | 'inactive';
}
