require('dotenv').config();
const { env } = require('process');

module.exports = {
   cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations',
   },
   database: env.DATABASE_NAME,
   entities: [
      'built/entities/**/*.entity.js',
   ],
   host: env.DATABASE_HOST,
   logging: env.NODE_ENV === 'development',
   migrations: [
      'built/migrations/**/*.js',
   ],
   password: env.DATABASE_PASS,
   port: parseInt(env.DATABASE_PORT || '') || 3306,
   synchronize: true,
   type: 'mysql',
   username: env.DATABASE_USER
};
