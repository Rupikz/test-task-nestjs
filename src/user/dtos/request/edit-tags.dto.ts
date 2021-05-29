import { ArrayMinSize } from 'class-validator';
import { ApiPropertyOptionalId } from 'src/libs/common/decorators';
import { ToInt } from 'src/libs/common/decorators/transform.decorator';

export class EditTagsDto {
  @ToInt({ each: true })
  @ArrayMinSize(1)
  @ApiPropertyOptionalId({ isArray: true, minItems: 1 }, { each: true })
  tags: number[];
}
