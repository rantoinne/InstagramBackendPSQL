import * as express from 'express';
import postController from '../controllers/postController';
import { authAppOrWeb } from '../utils/auth';

export default function postRoutes(app: express.Application) {
  const apiPostRouteURL = '/api/v1/post';
  app
    .route(`${apiPostRouteURL}/create`)
    .post(authAppOrWeb, postController.createNewPost);
  app
    .route(`${apiPostRouteURL}/get-feed`)
    .get(authAppOrWeb, postController.getPostsFeed);
}
