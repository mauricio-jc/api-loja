import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Not, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async all(): Promise<Category[] | any> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Falha na requisição',
        error: error.name,
      });
    }
  }

  async findOneById(id: number): Promise<Category | any> {
    try {
      const category = await this.categoryRepository.findOneBy({ id });
      if (!category) throw new NotFoundException();
      return category;
    } catch (error) {
      if (error.response.statusCode == 404) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Categoria não encontrada',
          error: error.name,
        });
      }

      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Falha na requisição',
        error: error.name,
      });
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
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao atualizar categoria',
        error: error.name,
      });
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
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao atualizar categoria',
        error: error.name,
      });
    }
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category | any> {
    try {
      if (await this.findOneByName(createCategoryDto.name)) {
        throw new BadRequestException();
      }

      return await this.categoryRepository.save(createCategoryDto);
    } catch (error) {
      if (error.response.statusCode == 400) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Categoria já cadastrada no banco de dados',
          error: error.name,
        });
      }

      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao cadastrar categoria',
        error: error.name,
      });
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
      if (error.response.statusCode == 400) {
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Categoria já cadastrada no banco de dados',
          error: error.name,
        });
      }

      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao cadastrar a categoria',
        error: error.message,
      });
    }
  }

  async delete(id: number): Promise<Category | any> {
    try {
      return await this.categoryRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao excluir a categoria',
        error: error.message,
      });
    }
  }
}
