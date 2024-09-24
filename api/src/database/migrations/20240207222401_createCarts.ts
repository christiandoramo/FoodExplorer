import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("carts", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE")
      .notNullable;
    table.decimal("amount").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("carts");
}
