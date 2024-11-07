import * as express from 'express';
import * as path from 'path';
import userRoutes from './userRoutes';
import ApplicationError from '../utils/applicationError';
import { nextType, reqType, resType } from '../config/types';
import postRoutes from './postRoutes';
import UserError from '../utils/userError';

const routes = (app: express.Application) => {
  userRoutes(app);
  postRoutes(app);

  // NOTE: We're using a named function so it shows the name on express debugging and stack traces
  // NOTE: Don't remove "_next" on errorHandler function although it isn't used, if we remove it
  // nodejs won't know this function is for error handling
  // (More info: https://expressjs.com/en/guide/error-handling.html)
  // eslint-disable-next-line prefer-arrow-callback, @typescript-eslint/no-unused-vars
  app.use('/api/*', (err: ApplicationError & UserError, _req: reqType, res: resType, _next: nextType): void => {
    if (!err.status) console.log('Error: ', err.stack);
    let errorResponse = {
      message: err.status ? err.message : 'Internal Error',
      type: err.type,
    };
    if (err.validationError) errorResponse = { ...err.validationError, ...errorResponse };

    res.status(err.status || 500).json(errorResponse);
  });
  app.get('*', (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
};

export default routes;
