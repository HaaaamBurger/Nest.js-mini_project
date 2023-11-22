import { UserListQueryRequestDto } from '../request/user-list.query.request.dto';

export class UserListResponseDto extends UserListQueryRequestDto {
  data: UserListItemResponseDto[];
  total: number;
}

export class UserListItemResponseDto {
  id: string;
  username: string;
  surname: string;
  age: number;
  phone_number: string;
  email: string;
  createdAt: Date;
}
