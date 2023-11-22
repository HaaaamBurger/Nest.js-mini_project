import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IList } from '../../common/interfaces/list.interface';
import { UserEntity } from '../../databasa/entities/user.entity';
import { UserUpdateRequestDto } from './dto/request/user.update.request.dto';
import { UserListQueryRequestDto } from './dto/request/user-list.query.request.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async all_users(
    query: UserListQueryRequestDto,
  ): Promise<IList<UserEntity>> {
    try {
      return await this.userRepository.getAllUsers(query);
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  public async user_by_id(id: string): Promise<UserEntity> {
    try {
      return await this.findUserByParamOrException(id, 'id');
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  public async update_user(
    dto: UserUpdateRequestDto,
    id: string,
  ): Promise<UserEntity> {
    try {
      const user = await this.findUserByParamOrException(id, 'id');

      this.userRepository.merge(user, dto);
      return await this.userRepository.save(user);
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  public async delete_user(id: string): Promise<void> {
    try {
      await this.findUserByParamOrException(id, 'id');

      await this.userRepository.delete({ id });
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  private async findUserByParamOrException(
    userId: string,
    param: string,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ [`${param}`]: userId });

    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }

    return user;
  }
}
