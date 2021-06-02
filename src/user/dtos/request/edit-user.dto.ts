import { ApiPropertyOptionalEmail, ApiPropertyOptionalNickname, ApiPropertyOptionalPassword } from 'src/libs/common/decorators';

export class EditUserDto {
  @ApiPropertyOptionalNickname(4, 30)
  nickname: string;

  @ApiPropertyOptionalEmail()
  email: string;

  @ApiPropertyOptionalPassword(6)
  password: string;
}
