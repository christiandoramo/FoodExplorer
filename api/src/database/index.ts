import knex from "knex";
import config from "./knexfile";

require("dotenv/config");

import * as path from "path";
import dotenv from "dotenv";

const envPath = path.resolve(__dirname, "..", "..", ".env");
dotenv.config({ path: envPath });

const NODE_ENV = process.env.NODE_ENV;
const knexEnv =
  NODE_ENV === "production" ? config.production : config.development;
const db = knex(knexEnv);

function connection() {
  db.raw("SELECT 1") // Teste simples de conexão
    .then(() => console.log("Database started with success"))
    .catch((error) => console.error("Database connection error: ", error));

  return db;
}

export { db, connection }; // minha conexão com Pg
