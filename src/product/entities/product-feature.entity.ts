import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_features')
export class ProductFeature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;
}
