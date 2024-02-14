import { Pool } from 'pg';

const pool = new Pool({
  user: 'user',
  host: 'postgres',
  database: 'database',
  password: 'password',
  port: 5432,
});

// DATABASE_URL=postgres://user:password@localhost:5432/database

export default pool;
