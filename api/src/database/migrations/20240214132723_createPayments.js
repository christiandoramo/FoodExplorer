/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("payments", (table) => {
    table.uuid("id", { primaryKey: true });
    table.enum("method", ["Cartâo de Crédito", "Pix"]);
    table.decimal("amount").notNullable();
    table.uuid("cart_id").references("id").inTable("carts").notNullable();
    table.timestamp("date").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("payments");
};
