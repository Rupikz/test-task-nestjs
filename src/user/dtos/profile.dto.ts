import { ApiProperty } from '@nestjs/swagger';
import { TagDto } from 'src/libs/models/tag';
import { UserDto, UserEntity } from 'src/libs/models/user';

export class ProfileDto extends UserDto {
  @ApiProperty({ type: TagDto, isArray: true })
  readonly tags: TagDto[];

  constructor(entity: UserEntity) {
    super(entity);
    this.tags = entity.tags;
  }
}
