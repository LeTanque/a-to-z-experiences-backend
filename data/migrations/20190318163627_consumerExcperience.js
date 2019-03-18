
exports.up = function(knex, Promise) {
  return knex.schema.createTable('consumerExperience', function(tbl) {
      tbl.increments()

      tbl.integer('consumer_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      tbl.integer('experience_id')
        .unsigned()
        .references('id')
        .inTable('experiences')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('consumerExperience')
};
