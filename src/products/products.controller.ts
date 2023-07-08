import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
  ParseFilePipeBuilder,
  UploadedFiles,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Helper } from 'src/helpers/Helper';

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
  @Get('image/:filename')
  async getImage(
    @Param('filename') filename: string,
    @Res() res: any,
  ): Promise<void> {
    res.sendFile(filename, { root: './public/images/products/' });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'images', maxCount: 4 }],
      Helper.storageFile('./public/images/products'),
    ),
  )
  @Post('create')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles(
      new ParseFilePipeBuilder().build({
        fileIsRequired: true,
        exceptionFactory() {
          throw new BadRequestException('Selecione pelo menos uma imagem');
        },
      }),
    )
    files: Express.Multer.File[],
  ): Promise<Product | any> {
    return await this.productsService.create(files['images'], createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'images', maxCount: 4 }],
      Helper.storageFile('./public/images/products'),
    ),
  )
  @Put('edit/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Product | any> {
    let images = null;
    if (Object.keys(files).length > 0) {
      images = files['images'];
    }
    return await this.productsService.update(
      Number(id),
      createProductDto,
      images,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string): Promise<Product | any> {
    return await this.productsService.delete(Number(id));
  }
}
