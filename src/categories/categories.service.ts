import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Like, Not, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProductsService } from 'src/products/products.service';
import { FilterCategoryDto } from './dto/filter-category.dto';
import { Paginator } from 'src/commons/paginator.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
  ) {}

  async all(filters?: FilterCategoryDto): Promise<Category[] | any> {
    try {
      let where = {};

      if (filters.name) {
        where = {
          name: Like(`%${filters.name}%`),
        };
      }

      const [data, total] = await this.categoryRepository.findAndCount({
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
        where: where,
        order: {
          name: 'ASC',
        },
      });

      return new Paginator(data, total, filters);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneById(id: number): Promise<Category | any> {
    try {
      const category = await this.categoryRepository.findOneBy({ id });
      if (!category) throw new NotFoundException();
      return category;
    } catch (error) {
      throw error;
    }
  }

  async findOneByName(name: string) {
    try {
      const exist = await this.categoryRepository.findOne({
        where: {
          name: name,
        },
      });

      if (exist === null) {
        return false;
      }

      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneByIdAndName(id: number, name: string) {
    try {
      const exist = await this.categoryRepository.findOne({
        where: {
          id: Not(id),
          name: name,
        },
      });

      if (exist === null) {
        return false;
      }

      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category | any> {
    try {
      if (await this.findOneByName(createCategoryDto.name)) {
        throw new BadRequestException();
      }

      return await this.categoryRepository.save(createCategoryDto);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category | any> {
    try {
      if (await this.findOneByIdAndName(id, createCategoryDto.name)) {
        throw new BadRequestException();
      }

      return await this.categoryRepository.update(id, createCategoryDto);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<Category | any> {
    try {
      const products = await this.productsService.findByCategorie(id);

      if (products.length > 0) {
        throw new BadRequestException();
      } else {
        return await this.categoryRepository.delete(id);
      }
    } catch (error) {
      throw error;
    }
  }
}
