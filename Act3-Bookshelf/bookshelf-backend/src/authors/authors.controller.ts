import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './schemas/author.schema';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Author | null> {
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: CreateAuthorDto): Promise<Author | null> {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Author | null> {
    return this.authorsService.remove(id);
  }
}
