import { OrderType } from '../constants';
import { ApiOptionPage, ApiOptionTake, ApiPropertyOptionalEnum } from '../decorators/api-property.decorator';

export class PageOptionsDto {
  @ApiPropertyOptionalEnum(OrderType, { default: OrderType.ASC })
  readonly order: OrderType = OrderType.ASC;

  @ApiOptionPage()
  readonly page: number = 1;

  @ApiOptionTake()
  readonly pageSize: number = 10;

  get skip(): number {
    return (this.page - 1) * this.pageSize;
  }
}
