import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'nestjs-redis';
import { DeletedStatus, RedisKey } from 'src/libs/common/constants';
import { IncorrectPasswordException, UserEmailOrNicknameExistException, UserNotFoundException } from 'src/libs/common/exceptions';
import { UserDto, UserEntity } from 'src/libs/models/user';
import { UserService } from 'src/user/user.service';
import { ConfigService } from 'src/utils/config.service';
import { UtilsService } from 'src/utils/utils';
import { FindConditions } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthSignupDto } from './dtos/auth-signup.dto';
import { TokenPayloadDto } from './dtos/token-payload.dto';
import { UserRefreshTransportDto } from './dtos/user-refresh-transport.dto';
import { UserTransportDto } from './dtos/user-transport.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private jwtService: JwtService
  ) {}

  async login(passwordLoginDto: AuthLoginDto): Promise<TokenPayloadDto> {
    const findData = <FindConditions<UserEntity>>{ email: passwordLoginDto.email };
    const user = await this.userService.getMin(findData);
    if (!user) {
      throw new UserNotFoundException();
    }
    const isPasswordValid = await UtilsService.validateHash(passwordLoginDto.password, user.password);
    if (!isPasswordValid) {
      throw new IncorrectPasswordException();
    }
    return await this.createToken(user);
  }

  async createToken(user: UserDto): Promise<TokenPayloadDto> {
    const payload = {
      userId: user.id,
    };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.jwtRefreshSecret,
      expiresIn: this.configService.jwtRefreshExpirationTime,
    });
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.jwtAccessSecret,
      expiresIn: this.configService.jwtAccessExpirationTime,
    });
    const tokenPayload = new TokenPayloadDto({
      accessExpiresIn: this.configService.jwtAccessExpirationTime,
      accessToken,
      refreshExpiresIn: this.configService.jwtRefreshExpirationTime,
      refreshToken,
    });
    return tokenPayload;
  }

  async refreshToken(session: UserRefreshTransportDto): Promise<TokenPayloadDto> {
    const redisClient = this.redisService.getClient();
    const key = `${RedisKey.REFRESH_TOKEN_BLACK_LIST}${session.refreshToken}`;
    const redisData = await redisClient.get(key);
    if (redisData) {
      throw new UnauthorizedException();
    }
    await redisClient.set(key, true.toString(), 'EX', ~~(session.exp - Date.now() / 1000));
    const user = await this.userService.getMin({ id: session.userId, deleted: DeletedStatus.NOT_DELETED });
    if (!user) {
      throw new UserNotFoundException();
    }
    return await this.createToken(user);
  }

  @Transactional()
  async signup(data: AuthSignupDto): Promise<UserDto> {
    const isExist = await this.userService.getMin([
      { email: data.email, deleted: DeletedStatus.NOT_DELETED },
      { nickname: data.nickname, deleted: DeletedStatus.NOT_DELETED },
    ]);
    if (isExist) {
      throw new UserEmailOrNicknameExistException();
    }
    return await this.userService.create({
      email: data.email,
      nickname: data.nickname,
      password: data.password,
    });
  }

  async logout(session: UserTransportDto): Promise<TokenPayloadDto> {
    const redisClient = this.redisService.getClient();
    const key = `${RedisKey.ACCESS_TOKEN_BLACK_LIST}${session.accessToken}`;
    const redisData = await redisClient.get(key);
    if (redisData) {
      throw new UnauthorizedException();
    }
    await redisClient.set(key, true.toString(), 'EX', ~~(session.exp - Date.now() / 1000));
    const user = await this.userService.getMin({ id: session.userId, deleted: DeletedStatus.NOT_DELETED });
    if (!user) {
      throw new UserNotFoundException();
    }
    return await this.createToken(user);
  }
}
