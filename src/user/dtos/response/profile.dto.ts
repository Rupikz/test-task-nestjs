import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertyEmail, ApiPropertyNickname } from 'src/libs/common/decorators';
import { UserEntity } from 'src/libs/models/user';
import { TagDto } from 'src/tag/dtos/response/tag.dto';

export class ProfileDto {
  @ApiPropertyNickname(4, 30)
  nickname: string | null;

  @ApiPropertyEmail()
  email: string;

  @ApiProperty({ type: TagDto, isArray: true })
  tags: TagDto[];

  constructor(entity: UserEntity) {
    this.nickname = entity.nickname;
    this.email = entity.email;
    this.tags = entity.tags;
  }
}
