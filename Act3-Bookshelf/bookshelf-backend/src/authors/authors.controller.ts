import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author' })
  async create(@Body() dto: CreateAuthorDto) {
    return this.authorsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authors' })
  async findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get author by ID' })
  async findById(@Param('id') id: string) {
    return this.authorsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update author' })
  async update(@Param('id') id: string, @Body() dto: Partial<CreateAuthorDto>) {
    return this.authorsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete author' })
  async remove(@Param('id') id: string) {
    await this.authorsService.delete(id);
    return { message: 'Author deleted successfully' };
  }
}
