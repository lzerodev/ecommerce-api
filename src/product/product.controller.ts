import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  async create(@Body() productData: CreateProductDto) {
    const product = new ProductEntity();

    product.id = randomUUID();
    product.name = productData.name;
    product.userID = productData.userID;
    product.value = productData.value;
    product.quantity = productData.quantity;
    product.description = productData.description;
    product.category = productData.category;
    // product.caracteristicas = productData.caracteristicas;
    // product.imagens = productData.imagens;

    const productCreated = this.productService.create(product);
    return productCreated;
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    if (!product) {
      return {
        message: 'Product not found',
      };
    }
    return product;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDTO: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.update(
      id,
      updateProductDTO,
    );

    return {
      message: 'Product updated successfully',
      product: updatedProduct,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedProduct = await this.productService.remove(id);

    return {
      message: 'Product deleted successfully',
      product: deletedProduct,
    };
  }
}
