import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';

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

  public async validateUser(data): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: data.id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  public async signIn(data): Promise<string> {
    return this.jwtService.sign(data);
  }

  public async decode(token: string) {
    try {
      return this.jwtService.decode(token);
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
