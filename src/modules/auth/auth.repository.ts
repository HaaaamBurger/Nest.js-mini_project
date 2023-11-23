import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../databasa/entities/user.entity';

@Injectable()
export class AuthRepository extends Repository<UserEntity> {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(UserEntity)
    public readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
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
}
