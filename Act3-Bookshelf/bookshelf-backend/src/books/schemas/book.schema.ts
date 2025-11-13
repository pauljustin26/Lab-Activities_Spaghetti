import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Author', required: true })
  authorId: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: string;

  @Prop()
  publishedDate?: Date;

  @Prop()
  description?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
