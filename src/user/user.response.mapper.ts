import { UserEntity } from '../databasa/entities/user.entity';
import { UserCreateResponse } from './dto/user.dto';

export class UserResponseMapper {
  static toDetailsDto(data: UserEntity): UserCreateResponse {
    return {
      id: data.id,
      username: data.username,
      surname: data.surname,
      age: data.age,
      phone_number: data.phone_number,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
