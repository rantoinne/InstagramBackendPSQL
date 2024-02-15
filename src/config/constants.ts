// export const isDev = process.env.NODE_ENV === 'development';
export const isDev = true;
export const isProd = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';
export const HASHING_SALT_ROUNDS = 10;
