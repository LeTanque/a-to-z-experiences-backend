
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
      tbl.increments()

      tbl.string('name', 128)
            .notNullable()

      tbl.string('email', 128)
            .notNullable()

      tbl.string('username', 128)
            .notNullable()
            .unique()

      tbl.string('password', 128)
            .notNullable()

      tbl.string('role', 128)
            .notNullable()

      tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
};
