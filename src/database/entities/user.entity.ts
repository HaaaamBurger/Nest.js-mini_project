import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CreatedUpdatedModel } from './common/created-updated.model';

@Entity('user')
export class UserEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({
    type: 'text',
  })
  username: string;

  @Column({
    type: 'text',
  })
  surname: string;

  @Column({
    type: 'int',
  })
  age: number;

  @Column({
    type: 'text',
  })
  phone_number: string;

  @Column({
    type: 'text',
  })
  email: string;

  @Column({
    type: 'text',
  })
  password: string;
}
