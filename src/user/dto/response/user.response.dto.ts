import { UserRequestDto } from '../request/user.request.dto';

export class UserResponseDto extends UserRequestDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
