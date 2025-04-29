import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_features')
export class ProductFeatureEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @ManyToOne(() => ProductEntity, (product) => product.features, {
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
