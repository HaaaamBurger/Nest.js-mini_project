import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserCreateRequestDto } from '../user/dto/request/user.create.request.dto';
import { UserResponseDto } from '../user/dto/response/user.response.dto';
import { AuthRepository } from './auth.repository';
import { AuthLoginRequestDto } from './dto/request/auth.login.request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  public async register(dto: UserCreateRequestDto): Promise<UserResponseDto> {
    try {
      const findUser = await this.authRepository.findOneBy({
        email: dto.email,
      });
      if (findUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const registered_user = this.authRepository.create(dto);
      await this.authRepository.save(registered_user);

      return registered_user;
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  @UseGuards(AuthGuard('bearer'))
  public async login(data: AuthLoginRequestDto) {
    const findUser = await this.authRepository.findOneBy({ email: data.email });

    if (!findUser) {
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
