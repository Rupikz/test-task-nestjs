import { AbstractEntity } from 'src/libs/common/entities/abstract.entity';
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user';

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

  @ManyToOne(() => UserEntity, (entity) => entity.tags, {})
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'users_tags',
  })
  users: UserEntity[];
}
