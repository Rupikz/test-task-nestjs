import { ApiProperty } from '@nestjs/swagger';
import { IPageMetaDtoParameters, PageMetaDto } from 'src/libs/common/dtos';
import { TagEntity } from 'src/libs/models/tag';
import { TagWithCreatorDto } from './tag-with-creator.dto';

export class TagPageDto {
  @ApiProperty({
    type: TagWithCreatorDto,
    isArray: true,
  })
  readonly data: TagWithCreatorDto[];

  @ApiProperty()
  readonly meta: PageMetaDto;

  constructor(data: TagEntity[], meta: IPageMetaDtoParameters) {
    this.data = data.map((it) => new TagWithCreatorDto(it));
    this.meta = new PageMetaDto(meta);
  }
}
