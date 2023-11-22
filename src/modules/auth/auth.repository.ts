import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../databasa/entities/user.entity';

@Injectable()
export class AuthRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }
}
