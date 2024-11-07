// export const isDev = process.env.NODE_ENV === 'development';
export const isDev = true;
export const isProd = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';
export const HASHING_SALT_ROUNDS = 10;

export const DB_USER = process.env.DB_USER;
export const DB_NAME = process.env.DB_NAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = Number(process.env.DB_PORT ?? '5432');

