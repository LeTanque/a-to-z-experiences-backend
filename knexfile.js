// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/AZExp.sqlite3'
    },
    migrations: {
      directory: './data/migrations'
    }
  },

  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/test.sqlite3'
    },
    migrations: {
      directory: './data/migrations'
    }
  },

};
