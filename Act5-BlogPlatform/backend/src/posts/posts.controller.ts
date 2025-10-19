// backend/src/posts/posts.controller.ts
import { Controller, Get, Query, Param, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService){}

  @Get()
  async list(@Query('page') page = '1', @Query('limit') limit = '10'){
    const p = parseInt(page, 10);
    const l = Math.min(parseInt(limit, 10), 50);
    return this.postsService.findAll(p, l);
  }

  @Get(':id')
  async get(@Param('id') id: string){
    return this.postsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePostDto, @Request() req){
    const userId = req.user.userId;
    const post = await this.postsService.create(dto, userId);
    return post;
  }
}
