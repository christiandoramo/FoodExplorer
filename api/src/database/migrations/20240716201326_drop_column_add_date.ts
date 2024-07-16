import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("items_products", function (table) {
    table.dropColumn("add_date");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("items_products", function (table) {
    table.timestamp("add_date").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
  });
}
