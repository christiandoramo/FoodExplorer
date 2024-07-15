// PARA RODAR NOVAS MIGRATION DEVE RODAR O ESSE ARQUIVO BUSCANDO O PATH COMPLETO

import type { Knex } from "knex";
import * as path from "path";
import dotenv from "dotenv";

const envPath = path.resolve(__dirname, "..", "..", ".env");
dotenv.config({ path: envPath });

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: Number(process.env.POSTGRES_PORT) || 5432,
    },
    seeds: {
      directory: "./seeds",
    },
    migrations: {
      directory: "./migrations",
    },
    useNullAsDefault: true,
  },

  // Outros ambientes como staging e production podem ser configurados aqui
};

module.exports = config;
