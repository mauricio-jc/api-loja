import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Actions } from '../acls/actions.decorator';
import { Action } from 'src/acls/action.enum';
import { RolesGuard } from 'src/acls/roles.guard';
import { FilterCategoryDto } from './dto/filter-category.dto';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @Actions(Action.ListCategories)
  async listAll(
    @Query() filters?: FilterCategoryDto,
  ): Promise<Category[] | any> {
    return await this.categoriesService.all(filters);
  }

  @Get(':id')
  @Actions(Action.ListCategories)
  async find(@Param('id') id: string): Promise<Category | any> {
    return await this.categoriesService.findOneById(Number(id));
  }

  @Post('create')
  @Actions(Action.CreateCategory)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category | any> {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Put('edit/:id')
  @Actions(Action.UpdateCategory)
  async updateCategory(
    @Param('id') id: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category | any> {
    return await this.categoriesService.update(Number(id), createCategoryDto);
  }

  @Delete('delete/:id')
  @Actions(Action.DeleteCategory)
  async deleteCategory(@Param('id') id: string): Promise<Category | any> {
    return await this.categoriesService.delete(Number(id));
  }
}
