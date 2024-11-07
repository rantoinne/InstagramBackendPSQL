import { Knex } from 'knex';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './constants';

const knexConfig: Knex.Config = {
  client: 'postgresql',
  connection: {
    user: DB_USER,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    password: DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  }
};

export default knexConfig;
