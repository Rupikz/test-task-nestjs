import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { RedisModuleOptions } from 'nestjs-redis';
import * as path from 'path';
import { name, version } from '../../package.json';
dotenv.config({
  path: path.join(__dirname, '../../../.env'),
});
export class ConfigService {
  constructor() {
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
    process.env.APP_NAME = name;
    process.env.APP_VERSION = version;
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return +this.get(key);
  }

  public getBoolean(key: string): boolean {
    return this.get(key) ? this.get(key).toLocaleLowerCase() === 'true' : false;
  }

  get jwtAccessSecret(): string {
    return this.get('JWT_ACCESS_SECRET');
  }

  get jwtAccessExpirationTime(): number {
    return this.getNumber('JWT_ACCESS_EXPIRATION_TIME');
  }

  get jwtRefreshSecret(): string {
    return this.get('JWT_REFRESH_SECRET');
  }

  get jwtRefreshExpirationTime(): number {
    return this.getNumber('JWT_REFRESH_EXPIRATION_TIME');
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const entities = [path.join(__dirname, '/../libs/models/**/**/*.entity{.ts,.js}')];
    const config = {
      entities,
      keepConnectionAlive: true,
      type: 'postgres',
      host: this.get('POSTGRES_HOST'),
      port: this.getNumber('POSTGRES_PORT'),
      username: this.get('POSTGRES_USER'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DB'),
      logging: true,
      migrationsRun: false,
      synchronize: false,
      schema: 'public',
    };
    return <TypeOrmModuleOptions>config;
  }

  get redisConfig(): RedisModuleOptions {
    const config = {
      host: this.get('REDIS_HOST'),
      port: this.getNumber('REDIS_PORT'),
      db: this.getNumber('REDIS_DB'),
      password: this.get('REDIS_PASSWORD'),
      keyPrefix: this.get('REDIS_PREFIX_APPLICATION'),
    };

    return <RedisModuleOptions>config;
  }
}
