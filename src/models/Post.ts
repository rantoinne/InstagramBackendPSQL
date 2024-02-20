import { Model, ModelObject, RelationMappings } from 'objection';
import User from './User';

export enum POST_TYPE {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  IMAGE_CAROUSEL = 'IMAGE_CAROUSEL',
}

class Post extends Model {
  static tableName = 'posts'

  id!: number;
  post_type!: POST_TYPE;
  post_url!: string;
  description!: string;
  likes_count!: number;
  comments_count!: number;
  user_id!: number;

  // Associated identifiers
  user!: User;

  // Associations
  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'users.id',
        to: 'posts.user_id'
      }
    }
  };
}

export type PostType = ModelObject<Post>;

export default Post;
