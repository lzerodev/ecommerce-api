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
    await this.productRepository.save(createProductDto);
  }

  async findAll() {
    const AllProducts = await this.productRepository.find();
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

  async remove(id: string) {
    await this.productRepository.delete({ id });
  }
}
