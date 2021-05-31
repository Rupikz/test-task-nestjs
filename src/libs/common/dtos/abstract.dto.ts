import { DeletedStatus } from '../constants';
import { ApiPropertyDate, ApiPropertyEnum } from '../decorators/api-property.decorator';
import { AbstractEntity } from '../entities/abstract.entity';

export class AbstractDto {
  @ApiPropertyEnum(DeletedStatus, { example: DeletedStatus.NOT_DELETED, default: DeletedStatus.NOT_DELETED })
  deleted: DeletedStatus;

  @ApiPropertyDate()
  createdAt: Date;

  constructor(entity: AbstractEntity) {
    this.deleted = entity.deleted;
    this.createdAt = entity.createdAt;
  }
}
