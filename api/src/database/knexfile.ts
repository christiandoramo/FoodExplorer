require("dotenv/config");
import * as path from "path";
import dotenv from "dotenv";
import { Knex } from "knex";

const envPath = path.resolve(__dirname, "..", "..", ".env");
dotenv.config({ path: envPath });

console.log("knex rodando em: ", process.env.NODE_ENV);

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: Number(process.env.POSTGRES_PORT) || 5432,
      ssl: { rejectUnauthorized: false }, // Importante para deploys no Render
    },
    seeds: {
      directory: "./seeds",
    },
    migrations: {
      directory: "./migrations",
    },
    useNullAsDefault: true,
  },
  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL_PROD,
      ssl: { rejectUnauthorized: false }, // Importante para deploys no Render
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

export default config;
