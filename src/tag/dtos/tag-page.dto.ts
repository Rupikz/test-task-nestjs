import { ApiProperty } from '@nestjs/swagger';
import { IPageMetaDtoParameters, PageMetaDto } from 'src/libs/common/dtos';
import { TagDto, TagEntity } from 'src/libs/models/tag';
import { UserDto } from 'src/libs/models/user';

class TagForPageDto extends TagDto {
  @ApiProperty({ type: UserDto })
  readonly user: UserDto;

  constructor(entity: TagEntity) {
    super(entity);
    this.user = new UserDto(entity.user);
  }
}

export class TagPageDto {
  @ApiProperty({
    type: TagForPageDto,
    isArray: true,
  })
  readonly data: TagForPageDto[];

  @ApiProperty()
  readonly meta: PageMetaDto;

  constructor(data: TagEntity[], meta: IPageMetaDtoParameters) {
    this.data = data.map((it) => new TagForPageDto(it));
    this.meta = new PageMetaDto(meta);
  }
}
