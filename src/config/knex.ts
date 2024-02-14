import { Knex } from 'knex';

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'postgres',
    user: 'user',
    password: 'password',
    database: 'database',
  },
};

export default knexConfig;
