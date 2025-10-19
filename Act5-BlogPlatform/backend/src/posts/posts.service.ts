// backend/src/posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>){}

  async create(dto: CreatePostDto, authorId: string){
    const created = new this.postModel({ ...dto, author: authorId });
    return created.save();
  }

  async findAll(page = 1, limit = 10){
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.postModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('author', 'username'),
      this.postModel.countDocuments(),
    ]);
    return { items, total, page, limit };
  }

  async findById(id: string){
    const p = await this.postModel.findById(id).populate('author', 'username').exec();
    if (!p) throw new NotFoundException('Post not found');
    return p;
  }

  async incCommentsCount(postId: string){
    await this.postModel.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });
  }
}
