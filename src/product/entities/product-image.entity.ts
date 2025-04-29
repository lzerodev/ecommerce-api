import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_images')
export class ProductImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'url', length: 100, nullable: false })
  url: string;

  @Column({ name: 'description', length: 100, nullable: false })
  description: string;

  @ManyToOne(() => ProductEntity, (product) => product.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: ProductEntity;

  // @CreateDateColumn({ name: 'created_at' })
  // createdAt: string;

  // @UpdateDateColumn({ name: 'updated_at' })
  // updatedAt: string;

  // @DeleteDateColumn({ name: 'deleted_at' })
  // deletedAt: string;
}
