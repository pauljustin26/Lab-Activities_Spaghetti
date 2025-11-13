import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty({ required: false })
  birthDate?: Date;
}
