import { Body, CacheInterceptor, Controller, Delete, Get, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserTransportDto } from 'src/auth/dtos/response/user-transport.dto';
import { JwtAuthUserGuard } from 'src/auth/guards/jwt-user.guard';
import { ApiOk, AuthSession } from 'src/libs/common/decorators';
import { TagEntity } from 'src/libs/models/tag';
import { EditTagsDto } from './dtos/request/edit-tags.dto';
import { EditUserDto } from './dtos/request/edit-user.dto';
import { ProfileEditDto } from './dtos/response/profile-edit.dto';
import { ProfileDto } from './dtos/response/profile.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
@ApiBearerAuth('USER')
@UseGuards(JwtAuthUserGuard)
@UseInterceptors(CacheInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOk({ summary: 'Профиль' }, { type: ProfileDto })
  async profile(@AuthSession() session: UserTransportDto): Promise<ProfileDto> {
    const profile = await this.userService.profile(session);
    return new ProfileDto(profile);
  }

  @Put()
  @ApiOk({ summary: 'Редактировать профиль' }, { type: ProfileDto })
  async edit(@AuthSession() session: UserTransportDto, @Body() data: EditUserDto): Promise<ProfileEditDto> {
    await this.userService.edit(session, data);
    return new ProfileEditDto(await this.userService.getMin({ id: session.userId }));
  }

  @Delete()
  @ApiOk({ summary: 'Удалить профиль' }, { type: Boolean })
  async remove(@AuthSession() session: UserTransportDto): Promise<boolean> {
    await this.userService.remove(session);
    return true;
  }

  @Post('tag')
  @ApiOk({ summary: 'Добавить теги пользователю' }, { type: ProfileDto })
  async addTags(@AuthSession() session: UserTransportDto, @Body() data: EditTagsDto): Promise<ProfileDto> {
    await this.userService.addTags(session, data);
    return new ProfileDto(await this.userService.getMin({ id: session.userId }));
  }

  @Delete('tag')
  @ApiOk({ summary: 'Удалить теги у пользователя' }, { type: ProfileDto })
  async removeTags(@AuthSession() session: UserTransportDto, @Body() data: EditTagsDto): Promise<ProfileDto> {
    await this.userService.removeTags(session, data);
    return new ProfileDto(await this.userService.getMin({ id: session.userId }));
  }

  @Get('tag/my')
  @ApiOk({ summary: 'Мои теги' }, { type: ProfileDto })
  async findTags(@AuthSession() session: UserTransportDto): Promise<TagEntity[]> {
    return await this.userService.findTags(session);
  }
}
