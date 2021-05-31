import { ApiPropertyId, ApiPropertyInt, ApiPropertyName } from 'src/libs/common/decorators/api-property.decorator';
import { AbstractDto } from 'src/libs/common/dtos/abstract.dto';
import { TagEntity } from './tag.entity';

export class TagDto extends AbstractDto {
  @ApiPropertyId()
  id: number;

  @ApiPropertyName()
  name: string;

  @ApiPropertyInt({ default: 0 })
  sortOrder: number;

  constructor(entity: TagEntity) {
    super(entity);
    this.name = entity.name;
    this.sortOrder = entity.sortOrder;
  }
}
