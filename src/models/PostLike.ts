import { Model, ModelObject, RelationMappings } from 'objection';
import Post from './Post';
import User from './User';

class PostLike extends Model {
  static tableName = 'post_likes';

  id!: number;
  user_id!: number;
  post_id!: number;

  // Associated identifiers
  post!: Post;
  user!: User;

  // Associations
  static relationMappings: RelationMappings = {
    post: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/Post',
      join: {
        from: 'posts.id',
        to: 'post_likes.post_id'
      }
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/User',
      join: {
        from: 'users.id',
        to: 'post_likes.user_id'
      }
    }
  };
}

export type PostLikeType = ModelObject<PostLike>;

export default PostLike;
