import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedModel } from './common/created-updated.model';

@Entity('user')
export abstract class UserEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  surname: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  age: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  phone_number: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'text',
  })
  account_type: string;

  @Column({
    type: 'text',
  })
  account_status: string;

  @Column({
    type: 'text',
  })
  account_role: string;
}