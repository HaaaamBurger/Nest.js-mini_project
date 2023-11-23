import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@webeleon/nestjs-redis';

import { CustomConfigService } from '../../config/config.service';
import { UserEntity } from '../../databasa/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { BearerStrategy } from './bearer.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({
      defaultStrategy: 'bearer',
      property: 'user',
    }),
    RedisModule.forRoot({
      url: 'redis://localhost:6379',
    }),
    JwtModule.registerAsync({
      useFactory: async (customConfigService: CustomConfigService) => ({
        secret: customConfigService.jwt_secret,
        signOptions: {
          expiresIn: customConfigService.jwt_expires_in,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, BearerStrategy],
  exports: [PassportModule, AuthModule],
})
export class AuthModule {}
