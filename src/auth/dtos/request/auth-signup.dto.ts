import { ApiPropertyEmail, ApiPropertyNickname, ApiPropertyPassword } from 'src/libs/common/decorators/api-property.decorator';

export class AuthSignupDto {
  @ApiPropertyNickname(4, 30)
  nickname: string;

  @ApiPropertyEmail()
  email: string;

  @ApiPropertyPassword(6)
  password: string;
}
