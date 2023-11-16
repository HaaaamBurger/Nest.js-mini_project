import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserRequestDto } from './dto/request/user.request.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async update_user(
    dto: Partial<UserRequestDto>,
    id: string,
  ): Promise<void> {
    try {
      const findUser = await this.userRepository.findOneBy({
        email: dto.email,
      });
      if (!findUser) {
        throw new HttpException('No such a user', HttpStatus.BAD_REQUEST);
      }

      await this.userRepository.update(id, dto);
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  public async delete_user(id: string): Promise<void> {
    try {
      const findUser = await this.userRepository.findOneBy({ id });
      if (!findUser) {
        throw new HttpException('No such a user', HttpStatus.BAD_REQUEST);
      }

      await this.userRepository.delete({ id });
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }
}
