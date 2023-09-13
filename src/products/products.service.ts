import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { Helper } from 'src/helpers/Helper';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @Inject(forwardRef(() => CategoriesService))
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
      if (error.response.statusCode == 404) {
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

  async create(
    files: Express.Multer.File[],
    createProductDto: CreateProductDto,
  ): Promise<Product | any> {
    try {
      const category = await this.categoriesService.findOneById(
        createProductDto.category_id,
      );

      const product = this.productRepository.create({
        ...createProductDto,
        category: category,
      });

      for (let i = 1; i <= files.length; i++) {
        if (i == 1) {
          product.image1 = files[i - 1].filename;
        }
        if (i == 2) {
          product.image2 = files[i - 1].filename;
        }
      }

      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao cadastrar produto',
        error: error,
      });
    }
  }

  async update(
    id: number,
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ): Promise<Product | any> {
    try {
      const product = await this.productRepository.findOneBy({ id });

      const category = await this.categoriesService.findOneById(
        createProductDto.category_id,
      );

      const updateProduct = this.productRepository.create({
        ...createProductDto,
        category: category,
      });

      if (files !== null) {
        if (createProductDto.change_image1 == 'change') {
          if (product.image1 != null && product.image1 != '') {
            await Helper.removeFile(
              `./public/images/products/${product.image1}`,
            );
          }

          if (files.length == 1) {
            updateProduct.image1 = files[0].filename;
          }

          if (files.length == 2) {
            updateProduct.image1 = files[1].filename;
          }
        }

        if (createProductDto.change_image2 == 'change') {
          if (product.image2 != null && product.image2 != '') {
            await Helper.removeFile(
              `./public/images/products/${product.image2}`,
            );
          }

          if (files.length == 1) {
            updateProduct.image2 = files[0].filename;
          }

          if (files.length == 2) {
            updateProduct.image2 = files[1].filename;
          }
        }
      }

      // if (file !== null) {
      //   if (product.image1 !== null && product.image1 !== '') {
      //   }
      //   updateProduct.image1 = file.filename;
      // }

      return await this.productRepository.update(id, updateProduct);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao atualizar produto',
        error: error,
      });
    }
  }

  async delete(id: number): Promise<Product | any> {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (product.image1 != null && product.image1 != '') {
        await Helper.removeFile(`./public/images/products/${product.image1}`);
      }

      if (product.image2 != null && product.image2 != '') {
        await Helper.removeFile(`./public/images/products/${product.image2}`);
      }

      return await this.productRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Problemas ao excluir produto',
        error: error,
      });
    }
  }

  async findByCategorie(categoryId: number): Promise<Product[] | any> {
    return await this.productRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
    });
  }
}
