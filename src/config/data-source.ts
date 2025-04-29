import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const PgDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
  logging: true,
});

export default PgDataSource;
