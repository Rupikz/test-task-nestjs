import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from 'src/utils/config.service';

@Injectable()
export class JwtRefreshUserStrategy extends PassportStrategy(Strategy, 'jwt-refresh-user') {
  constructor(public readonly configService: ConfigService, public readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtRefreshSecret,
    });
  }

  async validate({ userId, exp }) {
    return { userId, exp };
  }
}
