import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async listAll(): Promise<Product[] | any> {
    return await this.productsService.all();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') id: string): Promise<Product | any> {
    return await this.productsService.find(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product | any> {
    return await this.productsService.create(createProductDto);
  }
}
