import { UserType } from "../models";
import Comment from "../models/Comment";

export const addCommentToPostId = async (
  postId: number,
  commentText: string,
  user: UserType,
): Promise<boolean> => {
  const comment = await Comment.query()
    .insert({
      post_id: postId,
      user_id: user.id,
      comment_text: commentText,
    });
  return !!comment;
};
