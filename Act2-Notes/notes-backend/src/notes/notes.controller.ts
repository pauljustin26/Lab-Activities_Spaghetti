// notes-backend/src/notes/notes.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.notesService.findAllForUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() body: { title: string; content?: string }) {
    return this.notesService.create(req.user.userId, body.title, body.content);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.notesService.findOne(req.user.userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Request() req, @Param('id') id: string, @Body() body: any) {
    return this.notesService.update(req.user.userId, id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    return this.notesService.remove(req.user.userId, id);
  }
}
