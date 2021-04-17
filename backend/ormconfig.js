const config = {
    type: process.env.DB_TYPE,
    database: process.env.DB_DATABASE,
    logging: process.env.isDevelopment,
    migrationsRun: process.env.DB_MIGRATIONS_RUN,
    acquireTimeout: process.env.DB_TIMEOUT,
    synchronize: process.env.DB_SYNCHRONIZE,
    entities: [
      'src/typeorm/entities/**/*{.entity.ts,.entity.js}',
    ],
    migrations: [
      'src/typeorm/migrations/**/*{.ts,.js}',
    ],
    cli: {
      entitiesDir: 'src/typeorm/entities',
      migrationsDir: 'src/typeorm/migrations',
    },
  };
  
  if (process.env.DB_TYPE === 'mysql')
    Object.assign(config, {
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
  
  if (process.env.DB_TYPE === 'postgres')
    Object.assign(config, {
      type: 'postgres',
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
      // https://stackoverflow.com/questions/35553432/error-handshake-inactivity-timeout-in-node-js-mysql-module
      keepConnectionAlive: true,
      url: process.env.DATABASE_URL,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      acquireTimeout: process.env.DB_TIMEOUT,
      rejectUnauthorized: true,
      extra: {
        ssl: process.env.DB_SSL,
      },
    });
  
  module.exports = config;