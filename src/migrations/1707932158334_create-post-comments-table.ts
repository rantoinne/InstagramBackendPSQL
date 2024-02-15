import { MigrationBuilder } from 'node-pg-migrate';
import { POST_TYPE } from '../models';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable('comments', {
    id: { type: 'bigserial', primaryKey: true },
    comment_text: { type: 'varchar(255)', notNull: true },

    user_id: {
      type: 'bigserial',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE'
    },
    post_id: {
      type: 'bigserial',
      notNull: true,
      references: 'posts(id)',
      onDelete: 'CASCADE'
    },

    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    deleted_at: { type: 'timestamp', notNull: false },
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable('posts');
};
