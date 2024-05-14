// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv/config");

import path from "path";

export const config = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: 5432,
    },
    seeds: {
      directory: "./seeds",
    },
    migrations: {
      directory: "./migrations",
    },
    useNullAsDefault: true,
  },
};
