const typeorm = require('typeorm');

const dataSource = new typeorm.DataSource({
  name: 'default',
  type: 'postgres',
  host: '0.0.0.0',
  port: '5432',
  username: '',
  password: '',
  database: 'march-2023',
  synchronize: false,
  migrationsRun: false,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.js,.ts}'],
});

module.exports = [dataSource];
