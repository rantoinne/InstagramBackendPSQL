import { Pool } from 'pg';
import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from './knex';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './constants';

const connectDb = () => {
  const db = Knex(knexConfig);
  Model.knex(db);
}

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err, pool);
  } else {
    console.log('Connected to PostgreSQL:', res.rows);
  }
});

export { pool, connectDb };
