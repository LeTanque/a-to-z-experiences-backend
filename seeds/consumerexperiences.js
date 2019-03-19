
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('consumerExperience').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('consumerExperience').insert([
        {consumer_id: 1, experience_id: 2},
        {consumer_id: 1, experience_id: 3},
        {consumer_id: 2, experience_id: 1},
        {consumer_id: 3, experience_id: 1},
        {consumer_id: 3, experience_id: 3},
        {consumer_id: 4, experience_id: 1},
        {consumer_id: 4, experience_id: 3},
        {consumer_id: 5, experience_id: 1},
        {consumer_id: 6, experience_id: 1},
        {consumer_id: 7, experience_id: 2},
        {consumer_id: 8, experience_id: 2},
        {consumer_id: 9, experience_id: 2},
      ]);
    });
};
