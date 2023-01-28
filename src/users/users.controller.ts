import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('filter')
  async getAllUsersByAge(@Query('age') age: number): Promise<Users[]> {
    return await this.usersService.findByAge(age);
  }

  @Get()
  async getAllUsers(): Promise<Users[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    return await this.usersService.findById(id);
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return await this.usersService.create(createUserDto);
  }

  @Patch('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    return await this.usersService.delete(id);
  }
}
