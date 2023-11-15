import { CreateDateColumn } from 'typeorm';

export class CreatedUpdatedModel {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  updatedAt: Date;
}
