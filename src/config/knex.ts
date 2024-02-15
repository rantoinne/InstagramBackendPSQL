import { Knex } from 'knex';

const knexConfig: Knex.Config = {
  client: 'postgresql',
  connection: {
    user: 'user',
    password: 'password',
    database: 'database',
  },
  pool: {
    min: 2,
    max: 10,
  }
};

export default knexConfig;
