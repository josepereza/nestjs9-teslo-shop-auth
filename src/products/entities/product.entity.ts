import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductImage } from './product-image.entity';
@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column('text', { unique: true })
  title: string;
  @ApiProperty()
  @Column('numeric', { default: 0 })
  price: number;
  @ApiProperty()
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
  @ApiProperty()
  @Column('text', { unique: true })
  slug: string;
  @ApiProperty()
  @Column('int', { default: 0 })
  stock: number;
  @ApiProperty()
  @Column('text', {
    array: true,
  })
  sizes: string[];
  @ApiProperty()
  @Column('text')
  gender: string;
  @ApiProperty()
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
