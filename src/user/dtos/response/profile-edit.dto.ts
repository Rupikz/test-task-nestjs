import { ApiPropertyEmail, ApiPropertyNickname } from 'src/libs/common/decorators';
import { UserEntity } from 'src/libs/models/user';

export class ProfileEditDto {
  @ApiPropertyNickname(4, 30)
  nickname: string | null;

  @ApiPropertyEmail()
  email: string;

  constructor(entity: UserEntity) {
    this.nickname = entity.nickname;
    this.email = entity.email;
  }
}
