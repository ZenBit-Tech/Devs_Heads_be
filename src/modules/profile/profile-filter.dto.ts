import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: false })
  search?: string;

  @ApiProperty({ required: false })
  category?: string;

  @ApiProperty({ required: false })
  skills?: string;

  @ApiProperty({ required: false })
  page?: string;

  @ApiProperty({ required: false })
  sort?: string;
}
