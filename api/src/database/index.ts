import knex from "knex";
import { config } from "./knexfile";

const db = knex(config.development);
export { db }; // minha conexão com Pg
