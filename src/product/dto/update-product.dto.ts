import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  CreateProductDto,
  ProductFeatureDTO,
  ProductImageDTO,
} from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsNotEmpty({ message: 'Product name cannot be empty' })
  @IsOptional()
  name?: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsOptional()
  @Min(1, { message: 'Value must be greater than zero' })
  @IsOptional()
  value?: number;

  @IsNumber()
  @Min(0, { message: 'Invalid minimum quantity' })
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductFeatureDTO)
  @IsOptional()
  features?: ProductFeatureDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  @IsOptional()
  images?: ProductImageDTO[];

  @IsString()
  @IsNotEmpty({ message: 'Category cannot be empty' })
  @IsOptional()
  category?: string;
}
