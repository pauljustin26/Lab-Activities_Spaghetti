import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  async create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  async findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by ID' })
  async findById(@Param('id') id: string) {
    return this.booksService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a book' })
  async update(@Param('id') id: string, @Body() dto: Partial<CreateBookDto>) {
    return this.booksService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  async remove(@Param('id') id: string) {
    await this.booksService.delete(id);
    return { message: 'Book deleted successfully' };
  }
}
