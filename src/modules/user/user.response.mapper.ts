import { IList } from '../../common/interfaces/list.interface';
import { UserEntity } from '../../databasa/entities/user.entity';
import { UserListQueryRequestDto } from './dto/request/user-list.query.request.dto';
import {
  UserListItemResponseDto,
  UserListResponseDto,
} from './dto/response/user.list.response.dto';
import { UserResponseDto } from './dto/response/user.response.dto';

export class UserResponseMapper {
  static toDetailsDto(data: UserEntity): UserResponseDto {
    return {
      id: data.id,
      username: data.username,
      surname: data.surname,
      age: data.age,
      phone_number: data.phone_number,
      password: data.password,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toListDto(
    data: IList<UserEntity>,
    query: UserListQueryRequestDto,
  ): UserListResponseDto {
    return {
      data: data.entities.map(this.toListItemDto),
      total: data.total,
      ...query,
    };
  }

  static toListItemDto(data: UserEntity): UserListItemResponseDto {
    return {
      id: data.id,
      username: data.username,
      surname: data.surname,
      age: data.age,
      phone_number: data.phone_number,
      email: data.email,
      createdAt: data.createdAt,
    };
  }
}
