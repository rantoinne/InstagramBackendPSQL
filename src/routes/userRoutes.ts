import * as express from 'express';
import userController from '../controllers/userController';


export default function userRoutes(app: express.Application) {
  const apiUserRouteURL = '/api/v1/user';
  app
    .route(`${apiUserRouteURL}/signup`)
    .post(userController.createUser);
    // .post(auth, validation, controller);
  app
    .route(`${apiUserRouteURL}/login`)
    .post(userController.loginUser);
  app
    .route(`${apiUserRouteURL}/name-available`)
    .get(userController.userNameAvailable);
}
