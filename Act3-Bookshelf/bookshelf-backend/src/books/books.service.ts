import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = new this.bookModel(createBookDto);
    return book.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
  
  async findOne(id: string): Promise<Book | null> {
    return this.bookModel.findById(id).exec();
  }

  async update(id: string, updateBookDto: CreateBookDto): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Book | null> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }

}
