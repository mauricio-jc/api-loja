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
  ParseFilePipe,
  BadRequestException,
  Req,
  ParseFilePipeBuilder,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('image', Helper.storageFile()))
  @Post('create')
  async createProduct(
    @Req() req,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ): Promise<Product | any> {
    if (req.fileValidationError) {
      throw new BadRequestException(
        'Only images are allowed',
        'Bad request. Accepted file extensions are:',
      );
    }
    return await this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product | any> {
    return await this.productsService.update(Number(id), createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string): Promise<Product | any> {
    return await this.productsService.delete(Number(id));
  }
}
