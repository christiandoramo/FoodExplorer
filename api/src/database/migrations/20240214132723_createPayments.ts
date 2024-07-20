import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("payments", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    table.enum("method", ["Cartâo de Crédito", "Pix"]);
    table.decimal("amount").notNullable();
    table.uuid("cart_id").references("id").inTable("carts").notNullable();
    table.timestamp("date").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("payments");
}
