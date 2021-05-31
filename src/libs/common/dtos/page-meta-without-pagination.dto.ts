import { ApiProperty } from '@nestjs/swagger';

interface IPageMetaDtoParameters {
  itemCount: number;
}

export class PageMetaWithoutPaginationDto {
  @ApiProperty()
  readonly itemCount: number;

  constructor({ itemCount }: IPageMetaDtoParameters) {
    this.itemCount = itemCount;
  }
}
