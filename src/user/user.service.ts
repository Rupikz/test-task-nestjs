import { Injectable } from '@nestjs/common';
import { UserDto, UserEntity, UserRepository } from 'src/libs/models/user';
import { FindConditions } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

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
}
