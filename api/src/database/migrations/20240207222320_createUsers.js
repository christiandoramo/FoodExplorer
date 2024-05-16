/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { USER_ROLES } from "./../../enums/users";

exports.up = async function (knex) {
  return await knex.schema.createTable("users", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    table.text("name").notNullable();
    table.text("email").notNullable();
    table.text("password").notNullable();
    table.text("avatar");
    table
      .enum("role", Object.values(USER_ROLES))
      .defaultTo(USER_ROLES.DEFAULT)
      .notNullable();
    table.text("refresh_token");
    table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
