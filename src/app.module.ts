import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { AuthModule } from './auth/auth.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import { ConfigService } from './utils/config.service';

@Global()
@Module({
  imports: [
    AuthModule,
    UserModule,
    TagModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.redisConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppModule {}
