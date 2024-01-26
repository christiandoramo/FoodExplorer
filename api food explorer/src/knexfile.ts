const path = require('path');
require('dotenv/config')

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
