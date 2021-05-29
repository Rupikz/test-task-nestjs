import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/libs/models/user';
import { UserService } from 'src/user/user.service';
import { ConfigService } from 'src/utils/config.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshUserStrategy } from './strategies/jwt-refresh-user.strategy';
import { JwtUserStrategy } from './strategies/jwt-user.strategy';

const configService = new ConfigService();

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: ['jwt-user', 'jwt-refresh-user'],
    }),
    JwtModule.register({
      secret: configService.jwtAccessSecret,
      signOptions: { expiresIn: configService.jwtAccessExpirationTime },
    }),
    TypeOrmModule.forFeature([UserRepository]),
    CacheModule.register(),
  ],
  exports: [
    PassportModule.register({
      defaultStrategy: ['jwt-user', 'jwt-refresh-user'],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtUserStrategy, JwtRefreshUserStrategy, ConfigService, UserService],
})
export class AuthModule {}
