import { Injectable } from '@nestjs/common';
import { ApiPropertyOptionalEnum } from 'src/libs/common/decorators';
import { PageOptionsDto } from 'src/libs/common/dtos';

enum Sort {
  id = 'id',
  sortOrder = 'sortOrder',
  name = 'name',
}
@Injectable()
export class TagPageOptionsDto extends PageOptionsDto {
  @ApiPropertyOptionalEnum(Sort)
  readonly sort: Sort = Sort.id;
}
