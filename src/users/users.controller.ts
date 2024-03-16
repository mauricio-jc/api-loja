import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async listAll(): Promise<User | any> {
    return this.usersService.all();
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User | any> {
    return this.usersService.create(createUserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('roles')
  async getRoles(@Request() request: any): Promise<any> {
    return await this.usersService.getRoles(request.user.id);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') id: string): Promise<User | any> {
    return this.usersService.findOneById(Number(id));
  }
}
