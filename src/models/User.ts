import { Model, RelationMappings } from 'objection';
import Knex from 'knex';
import Post from './Post';
import Comment from './Comment';
import PostLike from './PostLike';
import knexConfig from '../config/knex';

const knex = Knex(knexConfig);

Model.knex(knex);

class User extends Model {
  static tableName = 'users';
  
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
}

export default User;
