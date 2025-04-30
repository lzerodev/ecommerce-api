import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductListDTO } from './dto/list-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productEntity = new ProductEntity();

    productEntity.name = createProductDto.name;
    productEntity.value = createProductDto.value;
    productEntity.quantity = createProductDto.quantity;
    productEntity.description = createProductDto.description;
    productEntity.category = createProductDto.category;
    productEntity.features = createProductDto.features;
    productEntity.images = createProductDto.images;

    return this.productRepository.save(productEntity);
  }

  async findAll(): Promise<ProductListDTO[]> {
    const AllProducts = await this.productRepository.find({
      relations: ['features', 'images'],
      order: { createdAt: 'DESC' },
    });
    const listProducts = AllProducts.map(
      (product) =>
        new ProductListDTO(
          product.id,
          product.name,
          product.features,
          product.images,
        ),
    );
    return listProducts;
  }

  async findOne(id: string) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.softDelete({ id });
  }
}
