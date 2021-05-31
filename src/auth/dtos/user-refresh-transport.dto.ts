import { ApiPropertyInt, ApiPropertyString, ApiPropertyUuid } from 'src/libs/common/decorators/api-property.decorator';

export class UserRefreshTransportDto {
  @ApiPropertyUuid()
  userId: string;

  @ApiPropertyString()
  refreshToken: string;

  @ApiPropertyInt()
  exp: number;

  constructor(entity: Record<string, any>) {
    this.userId = entity.userId;
    this.refreshToken = entity.refreshToken;
    this.exp = entity.exp;
  }
}
