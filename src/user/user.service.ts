import { Injectable } from '@nestjs/common';
import { UserTransportDto } from 'src/auth/dtos/response/user-transport.dto';
import { DeletedStatus } from 'src/libs/common/constants';
import { IncorrectPasswordException, TagNotFoundException, UserEmailOrNicknameExistException } from 'src/libs/common/exceptions';
import { UserEntity, UserRepository } from 'src/libs/models/user';
import { UsersTagsEntity, UsersTagsRepository } from 'src/libs/models/users-tags';
import { TagService } from 'src/tag/tag.service';
import { UtilsService } from 'src/utils/utils';
import { FindConditions, In } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { EditTagsDto } from './dtos/request/edit-tags.dto';
import { EditUserDto } from './dtos/request/edit-user.dto';
import { UserDto } from './dtos/response/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tagService: TagService,
    private readonly usersTagsRepository: UsersTagsRepository
  ) {}

  @Transactional()
  async create(data: Partial<UserEntity>): Promise<UserDto> {
    return new UserDto(await this.userRepository.save(this.userRepository.create({ ...data })));
  }

  async getMin(findData: FindConditions<UserEntity>[] | FindConditions<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: findData });
  }

  async profile(session: UserTransportDto): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where({ id: session.userId })
      .leftJoinAndSelect('user.createdTags', 'tag', 'tag.deleted = :deleted', { deleted: DeletedStatus.NOT_DELETED })
      .getOne();
  }

  @Transactional()
  async edit(session: UserTransportDto, data: EditUserDto): Promise<void> {
    const user = await this.getMin({ id: session.userId });
    const findData = <FindConditions<UserEntity>>{ deleted: DeletedStatus.NOT_DELETED };
    if (data.nickname) {
      findData.nickname = data.nickname;
    }
    if (data.email) {
      findData.email = data.email;
    }
    const isExist = await this.getMin(findData);
    if (isExist) {
      throw new UserEmailOrNicknameExistException();
    }
    if (data.password) {
      const isPasswordValid = await UtilsService.validateHash(data.password, user.password);
      if (!isPasswordValid) {
        throw new IncorrectPasswordException();
      }
    }
    await this.userRepository.update({ id: session.userId }, { ...data, updatedAt: new Date() });
  }

  @Transactional()
  async remove(session: UserTransportDto): Promise<void> {
    await this.userRepository.update({ id: session.userId }, { deleted: DeletedStatus.PERMANENTLY_DELETED, updatedAt: new Date() });
    const findData = <FindConditions<UsersTagsEntity>>{ userId: session.userId };
    await this.usersTagsRepository.update(findData, { deleted: DeletedStatus.CASCADE_DELETED });
  }

  @Transactional()
  async addTags(session: UserTransportDto, data: EditTagsDto): Promise<void> {
    const tags = await this.tagService.find({
      id: In(data.tags),
      deleted: DeletedStatus.NOT_DELETED,
    });
    if (!tags || tags.length !== data.tags.length) {
      throw new TagNotFoundException();
    }
    await this.usersTagsRepository
      .createQueryBuilder('users_tags')
      .insert()
      .into('users_tags')
      .values(data.tags.map((tagId) => ({ tagId, userId: session.userId, deleted: DeletedStatus.NOT_DELETED })))
      .orUpdate({ conflict_target: ['tagId', 'userId'], overwrite: ['deleted'] })
      .execute();
  }

  @Transactional()
  async removeTags(session: UserTransportDto, data: EditTagsDto): Promise<void> {
    const tags = await this.tagService.find({
      id: In(data.tags),
      deleted: DeletedStatus.NOT_DELETED,
    });
    if (!tags || tags.length !== data.tags.length) {
      throw new TagNotFoundException();
    }
    await this.usersTagsRepository.update({ userId: session.userId, tagId: In(data.tags) }, { deleted: DeletedStatus.PERMANENTLY_DELETED });
  }

  @Transactional()
  async findTags(session: UserTransportDto): Promise<UsersTagsEntity[]> {
    return await this.usersTagsRepository
      .createQueryBuilder('users_tags')
      .where({ userId: session.userId, deleted: DeletedStatus.NOT_DELETED })
      .innerJoinAndSelect('users_tags.tag', 'tag', 'tag.deleted = :deleted', { deleted: DeletedStatus.NOT_DELETED })
      .getMany();
  }
}
