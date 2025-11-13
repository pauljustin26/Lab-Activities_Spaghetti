// src/users/users.controller.ts
import { Controller, Get, Post, Param, Patch, Delete, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.delete(id);
    return { message: 'User deleted successfully' };
  }
}
