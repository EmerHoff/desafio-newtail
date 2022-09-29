import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'bdnewtail',
  database: 'desafio-newtail',

  entities: ["./src/modules/**/entities/*.ts"],

  synchronize: false,
  migrationsRun: false,
  logging: false,

  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};

export = config;
