import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  async create(@Body() productData: CreateProductDto) {
    const product = await this.productService.create(productData);
    return {
      message: 'Product created successfully',
      product: product,
    };
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
