import { Model, RelationMappings } from 'objection';
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
  post_like_count!: number;
  post_comments_count!: number;

  // Associated identifiers
  user!: User;

  // Associations
  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/User',
      join: {
        from: 'users.id',
        to: 'posts.user_id'
      }
    }
  };
}

export default Post;
