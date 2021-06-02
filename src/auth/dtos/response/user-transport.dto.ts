import { ApiPropertyAccessToken, ApiPropertyInt, ApiPropertyUuid } from 'src/libs/common/decorators/api-property.decorator';

export class UserTransportDto {
  @ApiPropertyUuid()
  userId: string;

  @ApiPropertyAccessToken()
  accessToken: string;

  @ApiPropertyInt()
  exp: number;

  constructor(entity: Record<string, any>) {
    this.userId = entity.userId;
    this.accessToken = entity.accessToken;
    this.exp = entity.exp;
  }
}
