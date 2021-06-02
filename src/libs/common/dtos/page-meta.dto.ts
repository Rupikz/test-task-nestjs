import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from './page-options.dto';

export interface IPageMetaDtoParameters {
  pageOptionsDto: PageOptionsDto;
  quantity: number;
}

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly quantity: number;

  @ApiProperty()
  readonly pageCount: number;

  constructor({ pageOptionsDto, quantity }: IPageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.pageSize = pageOptionsDto.pageSize;
    this.quantity = quantity;
    this.pageCount = Math.ceil(quantity / this.pageSize);
  }
}
