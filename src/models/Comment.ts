import { Model, RelationMappings } from 'objection';
import Post from './Post';
import User from './User';

class Comment extends Model {
  static tableName = 'comments';

  id!: number;
  comment_text!: string;
  user_id!: number;
  post_id!: number;

  // static jsonSchema = {
  //   type: 'object',
  //   required: ['comment_text'],
  //   properties: {
  //     id: {type: 'number'},
  //     comment_text: {type: 'string', minLength: 1},
  //     user_id: {'$ref': '#/definitions/User'},
  //     post_id: {'$ref': '#/definitions/Post'}
  //   },
  //   definitions: {
  //     User: User.jsonSchema,
  //     Post: Post.jsonSchema
  //   }
  // };

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
        to: 'comments.post_id'
      }
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/User',
      join: {
        from: 'users.id',
        to: 'comments.user_id'
      }
    }
  };
}

export default Comment;
