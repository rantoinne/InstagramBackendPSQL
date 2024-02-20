import { PostType, UserType } from "../models";
import Post, { POST_TYPE } from "../models/Post";

export const createPost = async (
  imageFilePath: string,
  user: UserType,
  description: string
): Promise<PostType> => {
  const post = await Post.query().insert({
    description,
    user_id: user.id,
    post_url: imageFilePath,
    post_type: POST_TYPE.IMAGE,
  });
  return post;
};
