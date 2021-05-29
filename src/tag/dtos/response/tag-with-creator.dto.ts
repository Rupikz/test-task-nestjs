import { ApiProperty } from '@nestjs/swagger';
import { TagEntity } from 'src/libs/models/tag';
import { UserDto } from 'src/libs/models/user';
import { TagDto } from './tag.dto';

export class TagWithCreatorDto extends TagDto {
  @ApiProperty({ type: UserDto })
  readonly creator: UserDto;

  constructor(entity: TagEntity) {
    super(entity);
  }
}
