import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { Strategy } from 'passport-http-bearer';

import { CustomConfigService } from '../../config/config.service';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthRepository } from './auth.repository';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  private logger = new Logger();
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
    private readonly customConfigService: CustomConfigService,
    @InjectRedisClient() readonly redisClient: RedisClient,
  ) {
    super();
  }

  public async validate(token: string): Promise<UserEntity> {
    let user = null;

    try {
      if (!(await this.redisClient.exists(token))) {
        throw new UnauthorizedException();
      }

      await this.jwtService.verify(token, {
        secret: this.customConfigService.jwt_access_secret,
      });
      const decodeToken = this.jwtService.decode(token);
      user = await this.authRepository.validateUser(decodeToken);
    } catch (e) {
      this.logger.log(e);
      throw new UnauthorizedException();
    }
    return user;
  }
}
