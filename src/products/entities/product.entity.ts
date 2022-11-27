import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './product-image.entity';
@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('numeric', { default: 0 })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column('text', { unique: true })
  slug: string;
  @Column('int', { default: 0 })
  stock: number;
  @Column('text', {
    array: true,
  })
  sizes: string[];
  @Column('text')
  gender: string;
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];
}
