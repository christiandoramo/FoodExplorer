// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require('dotenv/config')
const path = require('path');
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: 5432
    },
    seeds: {
      directory: path.resolve(__dirname,"src", "database", "seeds")
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations")
    },
    useNullAsDefault: true,
  },
};
