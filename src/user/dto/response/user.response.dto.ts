import { UserBaseRequestDto } from '../request/user-base.request.dto';

export class UserResponseDto extends UserBaseRequestDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
