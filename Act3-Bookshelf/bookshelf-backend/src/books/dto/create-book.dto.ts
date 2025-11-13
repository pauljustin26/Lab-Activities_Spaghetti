import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  authorId: string; // MongoDB ObjectId as string

  @ApiProperty()
  categoryId: string; // MongoDB ObjectId as string

  @ApiProperty({ required: false })
  publishedDate?: Date;

  @ApiProperty({ required: false })
  description?: string;
}
