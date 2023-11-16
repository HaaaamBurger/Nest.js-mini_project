import { ApiProperty } from '@nestjs/swagger';

import { UserRequestDto } from '../request/user.request.dto';

export class UserResponseDto extends UserRequestDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
