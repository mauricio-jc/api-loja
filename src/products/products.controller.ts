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
  Req,
  Res,
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
  @Get('image/:filename')
  async getImage(
    @Param('filename') filename: string,
    @Res() res: any,
  ): Promise<void> {
    res.sendFile(filename, { root: './public/images/products/' });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', Helper.storageFile('./public/images/products')),
  )
  @Post('create')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Product | any> {
    if (!file) {
      throw new BadRequestException('Imagem inválida!');
    } else {
      return await this.productsService.create(file, createProductDto);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', Helper.updateFile('./public/images/products')),
  )
  @Put('edit/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Product | any> {
    // let image = null;
    if (file) {
      console.log(file);
      // image = file;
      return {
        filePath: file.originalname,
      };
    }

    // return await this.productsService.update(
    //   Number(id),
    //   createProductDto,
    //   image,
    // );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteProduct(@Param('id') id: string): Promise<Product | any> {
    return await this.productsService.delete(Number(id));
  }
}
