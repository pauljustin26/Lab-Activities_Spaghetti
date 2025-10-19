// src/tasks/task.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @ApiProperty({ example: 'Finish homework', description: 'Title of the task' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ example: false, description: 'Task completion status' })
  @Prop({ default: false })
  completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

