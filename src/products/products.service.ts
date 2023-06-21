import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  async all(): Promise<Product[] | any> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Falha na requisição',
        error: error.name,
      });
    }
  }

  async find(id: number): Promise<Product | any> {
    try {
      const product = await this.productRepository.findOneBy({ id });
      if (!product) throw new NotFoundException();
      return product;
    } catch (error) {
      if (error.respose.statusCode == 404) {
        throw new NotFoundException({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Produto não encontrado',
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

  async create(createProductDto: CreateProductDto): Promise<Product | any> {
    try {
      const category = await this.categoriesService.findOneById(
        createProductDto.category_id,
      );
      const product = new Product();
      product.name = createProductDto.name;
      product.price = createProductDto.price;
      product.quantity = createProductDto.quantity;
      product.description = createProductDto.description;
      product.category = category;

      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao cadastrar produto',
        error: error,
      });
    }
  }
}
