import * as express from 'express';
import commentController from '../controllers/commentController';
import { authAppOrWeb } from '../utils/auth';

export default function postRoutes(app: express.Application) {
  const apiCommentRouteURL = '/api/v1/comment';
  app
    .route(`${apiCommentRouteURL}/add`)
    .post(authAppOrWeb, commentController.addCommentOnPost);
}
