import { ApiPropertyEmail, ApiPropertyNickname, ApiPropertyUuid } from 'src/libs/common/decorators/api-property.decorator';
import { AbstractDto } from 'src/libs/common/dtos/abstract.dto';
import { UserEntity } from './user.entity';

export class UserDto extends AbstractDto {
  @ApiPropertyUuid()
  id: string;

  @ApiPropertyNickname(4, 30)
  nickname: string | null;

  @ApiPropertyEmail()
  email: string;

  constructor(entity: UserEntity) {
    super(entity);
    this.id = entity.id;
    this.nickname = entity.nickname;
    this.email = entity.email;
  }
}
