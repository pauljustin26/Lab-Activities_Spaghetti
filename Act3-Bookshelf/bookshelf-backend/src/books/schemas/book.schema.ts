import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop()
  author: string;

  @Prop()
  category: string;

  @Prop()
  publishedDate: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
