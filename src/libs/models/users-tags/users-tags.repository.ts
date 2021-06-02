import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { UsersTagsEntity } from '.';

@EntityRepository(UsersTagsEntity)
export class UsersTagsRepository extends Repository<UsersTagsEntity> {}
