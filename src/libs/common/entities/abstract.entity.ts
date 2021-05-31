import { Column, CreateDateColumn } from 'typeorm';
import { DeletedStatus } from '../constants';

export abstract class AbstractEntity {
  @Column({
    type: 'text',
    name: 'deleted',
    enum: DeletedStatus,
    default: DeletedStatus.NOT_DELETED,
  })
  deleted: DeletedStatus;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
