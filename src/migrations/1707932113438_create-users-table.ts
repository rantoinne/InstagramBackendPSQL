import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  pgm.createTable('users', {
    id: { type: 'bigserial', primaryKey: true },
    name: { type: 'varchar(100)', notNull: true },
    user_name: { type: 'varchar(50)', notNull: true, unique: true },
    email: { type: 'varchar(100)', notNull: true, unique: true },
    hashed_password: { type: 'varchar(255)', notNull: true },

    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    deleted_at: { type: 'timestamp', notNull: false },
  });
};

export const down = (pgm: MigrationBuilder) => {
  pgm.dropTable('users');
};
