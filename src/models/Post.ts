import { Model, ModelObject, RelationMappings } from 'objection';
import User from './User';
import Comment from './Comment';
import PostLike from './PostLike';

export enum POST_TYPE {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  IMAGE_CAROUSEL = 'IMAGE_CAROUSEL',
}

class Post extends Model {
  static tableName = 'posts'

  static get idColumn() {
    return 'id';
  }

  id!: number;
  post_type!: POST_TYPE;
  post_url!: string;
  description!: string;
  likes_count!: number;
  comments_count!: number;
  user_id!: number;

  // Associated identifiers
  user!: User;
  comments?: Comment[];
  likes?: PostLike[];

  // Associations
  static relationMappings: RelationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/User',
      join: {
        from: 'users.id',
        to: 'posts.user_id'
      }
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/Comment',
      join: {
        to: 'posts.id',
        from: 'comments.post_id'
      }
    },
    likes: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/PostLike',
      join: {
        to: 'posts.id',
        from: 'post_likes.post_id'
      }
    }
  };
}

export type PostType = ModelObject<Post>;

export default Post;
