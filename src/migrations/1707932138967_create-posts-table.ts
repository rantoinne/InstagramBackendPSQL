import { MigrationBuilder } from 'node-pg-migrate';

export const up = (pgm: MigrationBuilder) => {
  // pgm.createTable('users', {
  //   id: { type: 'serial', primaryKey: true },
  //   username: { type: 'varchar(100)', notNull: true },
  //   email: { type: 'varchar(100)', notNull: true, unique: true },
  //   password: { type: 'varchar(255)', notNull: true },
  //   created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  //   updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  // });
};

export const down = (pgm: MigrationBuilder) => {
  // pgm.dropTable('users');
};
