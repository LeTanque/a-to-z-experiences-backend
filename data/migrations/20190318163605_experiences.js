
exports.up = function(knex, Promise) {
  return knex.schema.createTable('experiences', function(tbl) {
      tbl.increments()

      tbl.string('title', 128)
        .notNullable()

      tbl.string('description', 512)
        .notNullable()

      tbl.string('image', 128)

      tbl.string('category', 128)
        .notNullable()
    
      tbl.integer('price')

      tbl.integer('maxSize')

      tbl.string('street', 128)
        .notNullable()

      tbl.string('city', 128)
        .notNullable()

      tbl.string('state', 128)
        .notNullable()

      tbl.integer('postCode')
        .notNullable()

      tbl.integer('provider_id')
         .unsigned()
         .references('id')
         .inTable('users')
         .onDelete('CASCADE')
         .onUpdate('CASCADE')

     tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('experiences')
};
