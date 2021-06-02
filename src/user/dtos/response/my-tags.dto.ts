import { ApiProperty } from '@nestjs/swagger';
import { UsersTagsEntity } from 'src/libs/models/users-tags';
import { TagDto } from 'src/tag/dtos/response/tag.dto';

export class MyTagDto {
  @ApiProperty({
    type: TagDto,
    isArray: true,
  })
  tags: TagDto[];

  constructor(entity: UsersTagsEntity[]) {
    this.tags = entity.map((it) => new TagDto(it.tag));
  }
}
