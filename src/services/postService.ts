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
      'posts.id',
      'posts.post_type',
      'posts.post_url',
      'posts.description',
      'posts.comments_count',
      'posts.likes_count',
      'users.user_name',
      'users.name',
    )
    .innerJoin('users', 'users.id', 'posts.user_id')
  return posts;
};
