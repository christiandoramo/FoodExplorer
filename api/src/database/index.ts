import knex from "knex";
import { config } from "./knexfile";

const db = knex(config.development);

function connection() {
  db.raw("SELECT 1") // Teste simples de conexão
    .then(() => console.log("Database started with success"))
    .catch((error) => console.error("Database connection error: ", error));

  return db;
}

export { db, connection }; // minha conexão com Pg
