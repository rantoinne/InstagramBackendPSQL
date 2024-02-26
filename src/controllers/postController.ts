import { nextType, reqType, resType } from '../config/types';
import asyncWrapper from '../utils/asyncWrapper';
import { createPost, getPostsForFeed } from '../services/postService';
import { UserType } from '../models';

const createNewPost = async (req: reqType, res: resType): Promise<void> => {
  const { description, url } = req.body;

  const userInfo = req.user as unknown as UserType;
  const newPost = await createPost(url, userInfo, description);

  res.status(200).json({
    post: newPost,
  });
};

export const getPostsFeed = async (req: reqType, res: resType, _next: nextType): Promise<void> => {
  const userInfo = req.user as unknown as UserType;
  const posts = await getPostsForFeed();
  res.status(200).json(posts);
};

export default {
  createNewPost: asyncWrapper(createNewPost),
  getPostsFeed: asyncWrapper(getPostsFeed),
}
