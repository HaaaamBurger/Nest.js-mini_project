import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { IList } from '../../common/interfaces/list.interface';
import { UserEntity } from '../../databasa/entities/user.entity';
import { UserListQueryRequestDto } from './dto/request/user-list.query.request.dto';
import { EUserListOrderField } from './enum/user-list-order-field_enum';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getAllUsers(
    query: UserListQueryRequestDto,
  ): Promise<IList<UserEntity>> {
    const queryBuilder = this.createQueryBuilder('user');

    switch (query.orderBy) {
      case EUserListOrderField.createdAt:
        queryBuilder.orderBy('user.createdAt', query.order);
        break;
      case EUserListOrderField.age:
        queryBuilder.orderBy('user.age', query.order);
        break;
    }

    queryBuilder.limit(query.limit);
    queryBuilder.offset(query.offset);

    const [entities, total] = await queryBuilder.getManyAndCount();

    return {
      entities,
      total,
    };
  }
}
