import { nextType, reqType, resType } from '../config/types';
import fs from 'fs';
import asyncWrapper from '../utils/asyncWrapper';
import { createPost, getPostsForFeed } from '../services/postService';
import { UserType } from '../models';
import { likePostWithId } from '../services/postLikeService';
import { addCommentToPostId } from '../services/commentService';

const addCommentOnPost = async (req: reqType, res: resType): Promise<void> => {
  const { postId, comment } = req.body;

  const userInfo = req.user as unknown as UserType;

  const isSuccess = await addCommentToPostId(postId, comment, userInfo);

  res.status(200).json({ isSuccess });
};

export default {
  addCommentOnPost: asyncWrapper(addCommentOnPost),
}
