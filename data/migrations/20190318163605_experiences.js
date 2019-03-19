
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
      //Price will be saved as x100. i.e. $100.25 is stored as 10025. Front end should /100 when accessing data

      tbl.integer('maxSize')

      tbl.string('street', 128)
        .notNullable()

      tbl.string('city', 128)
        .notNullable()

      tbl.string('region', 128)
        .notNullable()

        tbl.string('country', 128)
        .notNullable()

      tbl.string('postCode')
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
