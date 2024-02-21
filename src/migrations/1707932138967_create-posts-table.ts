import { MigrationBuilder } from 'node-pg-migrate';
import { POST_TYPE } from '../models';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable('posts', {
    id: { type: 'bigserial', primaryKey: true },
    post_type: {
      type: 'varchar(14)',
      notNull: true,
      check: `post_type in ('${POST_TYPE.IMAGE}', '${POST_TYPE.IMAGE_CAROUSEL}', '${POST_TYPE.VIDEO}')`,
    },
    post_url: { type: 'varchar(255)', notNull: true, unique: true },
    description: { type: 'varchar(255)', notNull: true },
    likes_count: { type: 'integer', notNull: false },
    comments_count: { type: 'integer', notNull: false },
    user_id: {
      type: 'bigserial',
      notNull: true,
      references: 'users(id)',
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
