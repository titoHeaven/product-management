import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  // CREATE - Add new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Check if SKU already exists
    const existingProduct = await this.productsRepository.findOne({
      where: { sku: createProductDto.sku },
    });

    if (existingProduct) {
      throw new ConflictException('Product with this SKU already exists');
    }

    // Create and save product
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  // READ - Get all products
  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      order: { createdAt: 'DESC' }, // Newest first
    });
  }

  // READ - Get single product by ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  // UPDATE - Update product
  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // Check if product exists
    const product = await this.findOne(id);

    // If updating SKU, check it's not taken by another product
    if (updateProductDto.sku && updateProductDto.sku !== product.sku) {
      const existingProduct = await this.productsRepository.findOne({
        where: { sku: updateProductDto.sku },
      });

      if (existingProduct) {
        throw new ConflictException('SKU already exists');
      }
    }

    // Update and save
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  // DELETE - Remove product
  async remove(id: number): Promise<Product> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
    return product;
  }
}
