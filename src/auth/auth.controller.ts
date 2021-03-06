import { Body, CacheInterceptor, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiOk, RefreshSession } from 'src/libs/common/decorators';
import { AuthSession } from 'src/libs/common/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dtos/request/auth-login.dto';
import { AuthSignupDto } from './dtos/request/auth-signup.dto';
import { TokenPayloadDto } from './dtos/response/token-payload.dto';
import { UserRefreshTransportDto } from './dtos/response/user-refresh-transport.dto';
import { UserTransportDto } from './dtos/response/user-transport.dto';
import { JwtRefreshAuthUserGuard } from './guards/jwt-refresh-user.guard';
import { JwtAuthUserGuard } from './guards/jwt-user.guard';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(CacheInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOk({ summary: 'Зарегистрироваться' }, { type: TokenPayloadDto })
  async signup(@Body() data: AuthSignupDto): Promise<TokenPayloadDto> {
    const user = await this.authService.signup(data);
    const token = await this.authService.createToken(user);
    return new TokenPayloadDto(token);
  }

  @Post('login')
  @ApiOk({ summary: 'Авторизоваться' }, { type: TokenPayloadDto })
  async login(@Body() data: AuthLoginDto): Promise<TokenPayloadDto> {
    const token = await this.authService.login(data);
    return new TokenPayloadDto(token);
  }

  // Этот прикол не работает
  @ApiBearerAuth('USER')
  @UseGuards(JwtAuthUserGuard)
  @Post('logout')
  @ApiOk({ summary: 'Выйти' }, { type: Boolean })
  async logout(@AuthSession() session: UserTransportDto): Promise<boolean> {
    await this.authService.logout(session);
    return true;
  }

  @ApiBearerAuth('USER_REFRESH')
  @UseGuards(JwtRefreshAuthUserGuard)
  @Post('refresh-token')
  @ApiOk({ summary: 'Обновить пару токенов' }, { type: TokenPayloadDto })
  async refreshToken(@RefreshSession() session: UserRefreshTransportDto): Promise<TokenPayloadDto> {
    const token = await this.authService.refreshToken(session);
    return new TokenPayloadDto(token);
  }
}
