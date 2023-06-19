import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async listAll(): Promise<User | any> {
    return this.usersService.all();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') id: string): Promise<User | any> {
    return this.usersService.findOneById(Number(id));
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User | any> {
    return this.usersService.create(createUserDto);
  }
}
