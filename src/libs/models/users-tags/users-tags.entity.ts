import { AbstractEntity } from 'src/libs/common/entities/abstract.entity';
import { Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TagEntity } from '../tag/tag.entity';
import { UserEntity } from '../user';

@Index('tagId_userId_unique_index', ['tagId', 'userId'], {
  unique: true,
})
@Entity('users_tags')
export class UsersTagsEntity extends AbstractEntity {
  @PrimaryColumn({ type: 'integer' })
  tagId: number;

  @PrimaryColumn({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => TagEntity, (entity) => entity.id, {})
  @JoinColumn({ name: 'tagId', referencedColumnName: 'id' })
  tag: TagEntity;

  @ManyToOne(() => UserEntity, (entity) => entity.id, {})
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
