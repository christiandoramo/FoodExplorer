const config = require("./../../../knexfile.js");
import knex from "knex";

const db = knex(config.development)
export { db }// minha conexão com Pg