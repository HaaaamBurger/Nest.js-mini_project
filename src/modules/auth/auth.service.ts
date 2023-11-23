import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../../databasa/entities/user.entity';
import { UserCreateRequestDto } from '../user/dto/request/user.create.request.dto';
import { UserResponseDto } from '../user/dto/response/user.response.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(data): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: data.id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  public async logIn(data) {
    return;
  }

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
}
