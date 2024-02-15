import { Model, ModelObject, QueryContext, RelationMappings } from 'objection';
import bcrypt from 'bcrypt';
import Post from './Post';
import Comment from './Comment';
import PostLike from './PostLike';
import { HASHING_SALT_ROUNDS } from '../config/constants';

export class User extends Model {
  static get tableName() {
    return 'users';
  }
  
  id!: number;
  name!: string;
  email!: string;
  hashed_password!: string;
  user_name!: string;

  // Associated identifiers
  posts?: Post[];
  comments?: Comment[];
  post_likes?: PostLike[];

  // Associations
  static relationMappings: RelationMappings = {
    posts: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/Post',
      join: {
        from: 'users.id',
        to: 'posts.user_id'
      }
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/Comment',
      join: {
        from: 'users.id',
        to: 'comments.user_id'
      }
    },
    post_likes: {
      relation: Model.HasManyRelation,
      modelClass: __dirname + '/PostLike',
      join: {
        from: 'users.id',
        to: 'post_likes.user_id'
      }
    }
  };

  // Hooks
  async $beforeInsert(queryContext: QueryContext) {
    await super.$beforeInsert(queryContext);
    
    // Hash the password before inserting it into the database
    if (this.hashed_password) {
      this.hashed_password = await bcrypt.hash(this.hashed_password, HASHING_SALT_ROUNDS);
    }
  }
}

export type UserType = ModelObject<User>;

export default User;
