import { Pool } from 'pg';
import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from './knex';

const connectDb = () => {
  const db = Knex(knexConfig);
  Model.knex(db);
}

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'database',
  password: 'password',
  port: 5432,
});

export { pool, connectDb };
