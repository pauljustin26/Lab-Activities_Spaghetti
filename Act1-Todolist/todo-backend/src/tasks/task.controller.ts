// src/tasks/task.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Task } from './task.schema';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'List of tasks', type: [Task] })
  findAll() {
    return this.taskService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ description: 'Task title', schema: { example: { title: 'New Task' } } })
  @ApiResponse({ status: 201, description: 'Task created', type: Task })
  create(@Body('title') title: string) {
    return this.taskService.create(title);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiBody({ description: 'Task data to update', schema: { example: { title: 'Updated Task', completed: true } } })
  @ApiResponse({ status: 200, description: 'Task updated', type: Task })
  update(@Param('id') id: string, @Body() body: any) {
    return this.taskService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task deleted' })
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}

