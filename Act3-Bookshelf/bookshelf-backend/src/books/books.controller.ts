import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book | null> {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto): Promise<Book | null> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Book | null> {
    return this.booksService.remove(id);
  }
}
