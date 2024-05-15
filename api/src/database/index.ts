import { config } from "./knexfile";
import knex from "knex";

const db = knex(config.development);
export { db }; // minha conexão com Pg
