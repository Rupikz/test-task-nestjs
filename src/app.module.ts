import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { ConfigService } from './utils/config.service';

@Global()
@Module({
  imports: [
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
