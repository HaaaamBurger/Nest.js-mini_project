import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';

import {
  ITokenPair,
  ITokenPayload,
} from '../../common/interfaces/token.interface';
import { CustomConfigService } from '../../config/config.service';
import { UserEntity } from '../../database/entities/user.entity';

@Injectable()
export class AuthRepository extends Repository<UserEntity> {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly customConfigService: CustomConfigService,
  ) {
    super(UserEntity, dataSource.manager);
  }

  public async validateUser(data: ITokenPayload): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: data._userId });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  public async signIn(payload: ITokenPayload): Promise<ITokenPair> {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.customConfigService.jwt_access_secret,
      expiresIn: '1m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.customConfigService.jwt_refresh_secret,
      expiresIn: '2m',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async decode(token: string): Promise<string> {
    try {
      return await this.jwtService.decode(token);
    } catch (e) {}
  }

  public async hash(data: string): Promise<string> {
    return await bcrypt.hash(
      data,
      Number(this.customConfigService.bcrypt_salt),
    );
  }
  public async compare(dataA: string, dataB: string): Promise<boolean> {
    return await bcrypt.compare(dataA, dataB);
  }
}
