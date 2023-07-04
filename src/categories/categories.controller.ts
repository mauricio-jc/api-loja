import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async listAll(): Promise<Category[] | any> {
    return await this.categoriesService.all();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') id: string): Promise<Category | any> {
    return await this.categoriesService.findOneById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category | any> {
    return await this.categoriesService.create(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category | any> {
    return await this.categoriesService.update(Number(id), createCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteCategory(@Param('id') id: string): Promise<Category | any> {
    return await this.categoriesService.delete(Number(id));
  }
}
