import { UserType } from "../models";
import PostLike from "../models/PostLike";

export const likePostWithId = async (
  postId: number,
  user: UserType
): Promise<boolean> => {
  const postLike = await PostLike.query()
  .insert({
    post_id: postId,
    user_id: user.id,
  });
  return !!postLike;
};
