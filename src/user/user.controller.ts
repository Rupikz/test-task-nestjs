import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserTransportDto } from 'src/auth/dtos/user-transport.dto';
import { JwtAuthUserGuard } from 'src/auth/guards/jwt-user.guard';
import { ApiOk, AuthSession } from 'src/libs/common/decorators';
import { EditUserDto } from './dtos/edit-user.dto';
import { ProfileDto } from './dtos/profile.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
@ApiBearerAuth('USER')
@UseGuards(JwtAuthUserGuard)
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
  async edit(@AuthSession() session: UserTransportDto, @Body() data: EditUserDto): Promise<ProfileDto> {
    await this.userService.edit(session, data);
    return new ProfileDto(await this.userService.getMin({ id: session.userId }));
  }
}
