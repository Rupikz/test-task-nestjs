import { ApiProperty } from '@nestjs/swagger';
import { TagEntity } from 'src/libs/models/tag';
import { UserDto } from 'src/user/dtos/response/user.dto';
import { TagDto } from './tag.dto';

export class TagWithCreatorDto extends TagDto {
  @ApiProperty({ type: UserDto })
  readonly creator: UserDto;

  constructor(entity: TagEntity) {
    super(entity);
    this.creator = new UserDto(entity.user);
  }
}
