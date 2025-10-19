// backend/src/comments/comments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>, private postsService: PostsService){}

  async create(dto: CreateCommentDto, authorId: string){
    const created = new this.commentModel({ post: dto.postId, author: authorId, content: dto.content });
    const saved = await created.save();
    // update comment count
    await this.postsService.incCommentsCount(dto.postId);
    return saved.populate('author', 'username');
  }

  async findByPost(postId: string, page=1, limit=20){
    const skip = (page -1)*limit;
    const items = await this.commentModel.find({ post: postId }).sort({ createdAt: 1 }).skip(skip).limit(limit).populate('author', 'username');
    const total = await this.commentModel.countDocuments({ post: postId });
    return { items, total, page, limit };
  }
}
