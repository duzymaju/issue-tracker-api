# Issue tracker

## Deployment
* for development:
  * to download all dependencies type `npm i`,
  * to enable local development database type `docker-compose up`,
  * to compile code and start server type `npm run dev`,
  * to execute tests type `npm run test`,
  * to fix code formatting type `npm run lint-fix`,
* for production:
  * to download all dependencies type `npm i --production` (this flag could be omitted if `NODE_ENV` environment variable is set to `production`),
  * to compile code type `npm run build`,
  * to start server type `npm start`.

## Database migrations
* to execute migrations type `npm run typeorm migration:run`,
* to create new migration type: `npm run typeorm migration:generate -- -n MigrationName`.
