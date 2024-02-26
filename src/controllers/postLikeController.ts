import { reqType, resType } from '../config/types';
import asyncWrapper from '../utils/asyncWrapper';
import { UserType } from '../models';
import { likePostWithId } from '../services/postLikeService';

const likePost = async (req: reqType, res: resType): Promise<void> => {
  const { postId } = req.body;

  const userInfo = req.user as unknown as UserType;

  const isSuccess = await likePostWithId(postId, userInfo);

  res.status(200).json({ isSuccess });
};

export default {
  likePost: asyncWrapper(likePost),
}
