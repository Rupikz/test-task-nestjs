import { ApiPropertyId, ApiPropertyInt, ApiPropertyName } from 'src/libs/common/decorators/api-property.decorator';
import { TagEntity } from '../../../libs/models/tag/tags/tag.entity';

export class TagDto {
  @ApiPropertyId()
  id: number;

  @ApiPropertyName()
  name: string;

  @ApiPropertyInt({ default: 0 })
  sortOrder: number;

  constructor(entity: TagEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.sortOrder = entity.sortOrder;
  }
}
