import { AbstractEntity } from 'src/libs/common/entities/abstract.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user';
import { UsersTagsEntity } from '../users-tags';

@Index('name_unique_index', ['name'], {
  unique: true,
})
@Entity('tags')
export class TagEntity extends AbstractEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', unique: true, length: 40 })
  name: string;

  @Column({ type: 'int' })
  sortOrder: number;

  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => UserEntity, (entity) => entity.createdTags, {})
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => UsersTagsEntity, (entity) => entity.userId, {})
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  users: UsersTagsEntity[];
}
