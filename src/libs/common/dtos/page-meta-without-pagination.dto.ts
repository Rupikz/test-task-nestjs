import { ApiProperty } from '@nestjs/swagger';

interface IPageMetaDtoParameters {
  quantity: number;
}

export class PageMetaWithoutPaginationDto {
  @ApiProperty()
  readonly quantity: number;

  constructor({ quantity }: IPageMetaDtoParameters) {
    this.quantity = quantity;
  }
}
