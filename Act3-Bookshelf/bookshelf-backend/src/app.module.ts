import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/bookshelf-db'),
    BooksModule,
    AuthorsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
