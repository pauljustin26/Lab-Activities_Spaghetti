import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(dto: CreateBookDto): Promise<Book> {
    const book = new this.bookModel(dto);
    return book.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find()
      .populate('authorId', 'name')
      .populate('categoryId', 'name')
      .exec();
  }

  async findById(id: string): Promise<Book | null> {
    return this.bookModel.findById(id)
      .populate('authorId', 'name')
      .populate('categoryId', 'name')
      .exec();
  }

  async update(id: string, dto: Partial<CreateBookDto>): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.bookModel.findByIdAndDelete(id).exec();
  }
}
