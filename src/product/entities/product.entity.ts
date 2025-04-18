import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', length: 100, nullable: false })
  userID: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  name: string;

  @Column({ name: 'valor', nullable: false })
  value: number;

  @Column({ name: 'quantidade', nullable: false })
  quantity: number;

  @Column({ name: 'descricao', length: 255, nullable: false })
  description: string;

  @Column({ name: 'categoria', length: 100, nullable: false })
  category: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  // @OneToOne((product) => 'product_features', { cascade: true })
  // features: ProductFeature[];
  // images: ImagemProduto[];
}
