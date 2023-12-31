import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';

import { ITokenPair } from '../../common/interfaces/token.interface';
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
      const hashedPassword = await this.authRepository.hash(dto.password);

      const findUser = await this.authRepository.findOneBy({
        email: dto.email,
      });
      if (findUser) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const registered_user = this.authRepository.create({
        ...dto,
        password: hashedPassword,
      });
      await this.authRepository.save(registered_user);

      return registered_user;
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  public async login(data: AuthLoginRequestDto): Promise<ITokenPair> {
    try {
      const findUser = await this.authRepository.findOneBy({
        email: data.email,
      });

      if (!findUser) {
        throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
      }

      const isMatched = await this.authRepository.compare(
        data.password,
        findUser.password,
      );

      if (!isMatched) {
        throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
      }

      const token = await this.authRepository.signIn({
        _userId: findUser.id,
        email: data.email,
      });

      await Promise.all([
        await this.redisClient.setEx(
          token.accessToken,
          10000,
          token.accessToken,
        ),
        await this.redisClient.setEx(
          token.refreshToken,
          20000,
          token.refreshToken,
        ),
      ]);

      return token;
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }

  public async refresh() {
    try {
    } catch (e) {
      throw new HttpException(e.message, e.error);
    }
  }
}
