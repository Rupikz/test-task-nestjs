import { ApiPropertyEmail, ApiPropertyPassword } from 'src/libs/common/decorators/api-property.decorator';

export class AuthLoginDto {
  @ApiPropertyEmail()
  readonly email: string;

  @ApiPropertyPassword(6)
  readonly password: string;
}
