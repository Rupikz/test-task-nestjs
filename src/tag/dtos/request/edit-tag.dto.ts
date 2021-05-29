import { ApiPropertyInt, ApiPropertyString } from 'src/libs/common/decorators/api-property.decorator';

export class EditTagDto {
  @ApiPropertyString()
  name: string;

  @ApiPropertyInt({ default: 0 })
  sortOrder: number;
}
