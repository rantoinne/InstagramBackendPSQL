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

export const getPostsForFeed = async (): Promise<PostType[]> => {
  const posts = await Post.query()
    .select(
      'posts.*',
      'users.user_name',
      'users.name',
      'users.avatar',
    )
    .leftJoin('users', 'users.id', 'posts.user_id')
    .leftJoin('post_likes', 'post_likes.post_id', 'posts.id')
    .leftJoin('comments', 'comments.post_id', 'posts.id')
    // .select('*')
    // .select('*')
  return posts;
};
