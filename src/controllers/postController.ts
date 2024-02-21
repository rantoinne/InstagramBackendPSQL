import { nextType, reqType, resType } from '../config/types';
import fs from 'fs';
import asyncWrapper from '../utils/asyncWrapper';
import { createPost, getPostsForFeed } from '../services/postService';
import { UserType } from '../models';

const createNewPost = async (req: reqType, res: resType, _next: nextType): Promise<void> => {
  const { description } = req.body;

  const userInfo = req.user as unknown as UserType;
  
  if (!req.files) {
    res.status(400).json({ error: 'No media found' });
  }

  const files = req.files as Express.Multer.File[] & { [fieldName: string]: Express.Multer.File[] };
  const image = files['image'][0];
  
  // By this point image is saved on disk

  const imageFilePath = `${image.destination}${image.originalname}`;

  fs.renameSync(image.path, imageFilePath);

  const newPost = await createPost(imageFilePath, userInfo, description)

  res.status(200).json({
    post: newPost,
  });
};

export const getPostsFeed = async (req: reqType, res: resType, _next: nextType): Promise<void> => {
  const userInfo = req.user as unknown as UserType;

  // Get followed user
  // Get recent posts
  // Limit the results for pagination
  // Share response
  const posts = await getPostsForFeed();
  res.status(200).json(posts);
};

export default {
  createNewPost: asyncWrapper(createNewPost),
  getPostsFeed: asyncWrapper(getPostsFeed),
}
