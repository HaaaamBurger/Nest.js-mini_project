import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

import { UserCreateRequestDto } from '../user/dto/request/user.create.request.dto';
import { UserResponseDto } from '../user/dto/response/user.response.dto';
import { AuthRepository } from './auth.repository';
import { AuthLoginRequestDto } from './dto/request/auth.login.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    @InjectRedisClient() private redisClient: RedisClient,
  ) {}

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

  public async login(data: AuthLoginRequestDto): Promise<string> {
    const findUser = await this.authRepository.findOneBy({ email: data.email });

    if (!findUser) {
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.authRepository.signIn({
      id: findUser.id,
    });

    await this.redisClient.setEx(token, 10000, token);

    return token;
  }
}
