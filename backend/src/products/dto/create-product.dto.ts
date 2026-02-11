import { IsString, IsNumber, IsOptional, Min, IsEnum } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  sku: string;

  @IsString()
  category: string;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsEnum(['active', 'inactive', 'draft'])
  status: string;

  @IsOptional()
  @IsString()
  image?: string;
}
