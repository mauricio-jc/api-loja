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
import { Roles } from '../acls/roles.decorator';
import { Role } from 'src/acls/role.enum';
import { RolesGuard } from 'src/acls/roles.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @Roles(Role.Admin)
  async listAll(): Promise<Category[] | any> {
    return await this.categoriesService.all();
  }

  @Get(':id')
  @Roles(Role.Admin)
  async find(@Param('id') id: string): Promise<Category | any> {
    return await this.categoriesService.findOneById(Number(id));
  }

  @Post('create')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category | any> {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Put('edit/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category | any> {
    return await this.categoriesService.update(Number(id), createCategoryDto);
  }

  @Delete('delete/:id')
  async deleteCategory(@Param('id') id: string): Promise<Category | any> {
    return await this.categoriesService.delete(Number(id));
  }
}
