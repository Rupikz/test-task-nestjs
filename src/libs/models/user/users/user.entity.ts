import { AbstractEntity } from 'src/libs/common/entities/abstract.entity';
import { PasswordTransformer } from 'src/libs/common/transformers';
import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagEntity } from '../../tag';

@Index('user_email_unique_index', ['email'], {
  unique: true,
})
@Index('user_nickname_unique_index', ['nickname'], {
  unique: true,
})
@Entity('users')
export class UserEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true, length: 30 })
  nickname: string;

  @Column({ type: 'varchar', unique: true, length: 100 })
  email: string;

  @Column({ type: 'varchar', transformer: new PasswordTransformer(), length: 100 })
  password: string;

  @OneToMany(() => TagEntity, (entity) => entity.user, {})
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  tags: TagEntity[];
}
