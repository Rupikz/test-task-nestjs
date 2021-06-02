import { ApiPropertyAccessToken, ApiPropertyInt } from 'src/libs/common/decorators';

export class TokenPayloadDto {
  @ApiPropertyInt()
  accessExpiresIn: number;

  @ApiPropertyAccessToken()
  accessToken: string;

  @ApiPropertyInt()
  refreshExpiresIn: number;

  @ApiPropertyAccessToken()
  refreshToken: string;

  constructor(data: { accessExpiresIn: number; refreshExpiresIn: number; accessToken: string; refreshToken: string }) {
    this.accessExpiresIn = data.accessExpiresIn;
    this.accessToken = data.accessToken;
    this.refreshExpiresIn = data.refreshExpiresIn;
    this.refreshToken = data.refreshToken;
  }
}
