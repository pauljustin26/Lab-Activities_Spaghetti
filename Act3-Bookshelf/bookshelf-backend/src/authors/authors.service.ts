import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from './schemas/author.schema';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author.name) private authorModel: Model<AuthorDocument>) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = new this.authorModel(createAuthorDto);
    return author.save();
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<Author | null> {
    return this.authorModel.findById(id).exec();
  }

  async update(id: string, updateAuthorDto: CreateAuthorDto): Promise<Author | null> {
    return this.authorModel.findByIdAndUpdate(id, updateAuthorDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Author | null> {
    return this.authorModel.findByIdAndDelete(id).exec();
  }
}
