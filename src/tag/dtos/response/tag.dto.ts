import { ApiPropertyId, ApiPropertyInt, ApiPropertyName } from 'src/libs/common/decorators/api-property.decorator';
import { TagEntity } from 'src/libs/models/tag';

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
