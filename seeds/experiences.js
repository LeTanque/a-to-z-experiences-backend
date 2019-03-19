
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('experiences').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('experiences').insert([
        {
          title: 'Cooking',
          description: 'Hey, take a look at the earthlings. Goodbye! What do they got in there? King Kong? I was part of something special. Do you have any idea how long it takes those cups to decompose. Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?',
          image: 'http://www.lynchburgparksandrec.com/wp-content/uploads/2016/01/camaje-cooking-7.jpg',
          category: 'learning',
          price: 2500,
          maxSize: 10,
          street: '555 Somewhere Rd',
          city: 'Tallahassee',
          region: 'Florida',
          country: 'USA',
          postCode: '32301',
          provider_id: 1
        },
        {
          title: 'Ziplining',
          description: 'We gotta burn the rain forest, dump toxic waste, pollute the air, and rip up the OZONE! \'Cause maybe if we screw up this planet enough, they won\'t want it anymore! God help us, we\'re in the hands of engineers. Just my luck, no ice. What do they got in there? King Kong?',
          image: 'https://frugalbeautiful.com/blog/wp-content/uploads/2015/11/Zip-lining-Vallarta-Adventures-1024x683.jpg',
          category: 'leisure',
          price: 6000,
          maxSize: 20,
          street: '221 Overthere Ln',
          city: 'Binghamton',
          region: 'New York',
          country: 'USA',
          postCode: '13901',
          provider_id: 4
        },
        {
          title: 'Fishing',
          description: 'Hey, take a look at the earthlings. Goodbye! What do they got in there? King Kong? I was part of something special. Do you have any idea how long it takes those cups to decompose. Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?',
          image: 'http://www.lynchburgparksandrec.com/wp-content/uploads/2016/01/camaje-cooking-7.jpg',
          category: 'learning',
          price: 2500,
          maxSize: 10,
          street: '725 Swimming Blvd',
          city: 'San Diego',
          region: 'California',
          country: 'USA',
          postCode: '22434',
          provider_id: 7
        },
      ]);
    });
};
