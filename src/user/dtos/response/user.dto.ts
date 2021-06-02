import { ApiPropertyEmail, ApiPropertyNickname, ApiPropertyUuid } from 'src/libs/common/decorators/api-property.decorator';
import { UserEntity } from 'src/libs/models/user';

export class UserDto {
  @ApiPropertyUuid()
  id: string;

  @ApiPropertyNickname(4, 30)
  nickname: string | null;

  @ApiPropertyEmail()
  email: string;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.nickname = entity.nickname;
    this.email = entity.email;
  }
}
