// src/tasks/task.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  findAll() {
    return this.taskModel.find().exec();
  }

  create(title: string) {
    return new this.taskModel({ title }).save();
  }

  update(id: string, updateData: Partial<Task>) {
    return this.taskModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  delete(id: string) {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
