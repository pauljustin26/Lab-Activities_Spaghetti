// backend/src/comments/comments.controller.ts
import { Controller, Post, Body, UseGuards, Request, Get, Query, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService){}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateCommentDto, @Request() req){
    return this.commentsService.create(dto, req.user.userId);
  }

  @Get('post/:postId')
  async byPost(@Param('postId') postId: string, @Query('page') page='1', @Query('limit') limit='20'){
    return this.commentsService.findByPost(postId, parseInt(page,10), parseInt(limit,10));
  }
}
