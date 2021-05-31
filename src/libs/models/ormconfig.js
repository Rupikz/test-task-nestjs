const path = require('path');

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/**/**/*.entity.ts'],
  synchronize: false,
  dropSchema: false,
  logging: true,
  migrations: [path.resolve(__dirname + '/../migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/libs/migrations',
    entitiesDir: 'src/libs/models',
    subscribersDir: 'src/libs/subscriber',
  },
  schema: 'public',
};
