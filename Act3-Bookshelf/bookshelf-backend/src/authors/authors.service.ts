import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author } from './schemas/author.schema';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  async create(dto: CreateAuthorDto): Promise<Author> {
    const author = new this.authorModel(dto);
    return author.save();
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async findById(id: string): Promise<Author | null> {
    return this.authorModel.findById(id).exec();
  }

  async update(id: string, dto: Partial<CreateAuthorDto>): Promise<Author | null> {
    return this.authorModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<void | null> {
    await this.authorModel.findByIdAndDelete(id).exec();
  }
}
