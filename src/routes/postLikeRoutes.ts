import * as express from 'express';
import postLikeController from '../controllers/postLikeController';
import { authAppOrWeb } from '../utils/auth';

export default function postRoutes(app: express.Application) {
  const apiPostLikeRouteURL = '/api/v1/like-post';
  app
    .route(`${apiPostLikeRouteURL}`)
    .post(authAppOrWeb, postLikeController.likePost);
}
