import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = new this.categoryModel(dto);
    return category.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findById(id: string): Promise<Category | null> {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, dto: Partial<CreateCategoryDto>): Promise<Category | null> {
    return this.categoryModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id).exec();
  }
}
