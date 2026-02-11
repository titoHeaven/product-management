import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // POST /products - Create new product
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // GET /products - Get all products
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // GET /products/:id - Get single product
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id); // + converts string to number
  }

  // PUT /products/:id - Update product
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  // DELETE /products/:id - Delete product
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Returns 204 (no content)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
