import { Injectable } from '@nestjs/common';
import { UserTransportDto } from 'src/auth/dtos/user-transport.dto';
import { DeletedStatus } from 'src/libs/common/constants';
import { UserEmailOrNicknameExistException } from 'src/libs/common/exceptions';
import { UserDto, UserEntity, UserRepository } from 'src/libs/models/user';
import { FindConditions } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { EditUserDto } from './dtos/edit-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  @Transactional()
  async create(data: Partial<UserEntity>): Promise<UserDto> {
    return new UserDto(await this.userRepository.save(this.userRepository.create({ ...data })));
  }

  async getMin(findData: FindConditions<UserEntity>[] | FindConditions<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: findData });
  }

  async profile(session: UserTransportDto): Promise<UserEntity> {
    const queryBuilder = await this.userRepository
      .createQueryBuilder('user')
      .where({ id: session.userId })
      .leftJoinAndSelect('user.tags', 'tag', 'tag.deleted = :deleted', { deleted: DeletedStatus.NOT_DELETED })
      .getOne();
    return queryBuilder;
  }

  @Transactional()
  async edit(session: UserTransportDto, data: EditUserDto): Promise<void> {
    const findData = <FindConditions<UserEntity>>{ deleted: DeletedStatus.NOT_DELETED };
    if(data.nickname) {
      findData.nickname = data.nickname;
    }
    if(data.email) {
      findData.email = data.email;
    }
    const user = await this.getMin(findData);
    if (user) {
      throw new UserEmailOrNicknameExistException();
    }
    // await this.tagRepository.update({ id: params.id }, { ...data, updatedAt: new Date() });
  }
}
