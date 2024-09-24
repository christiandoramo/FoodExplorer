import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("orders", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    table
      .uuid("payment_id")
      .references("id")
      .inTable("payments")
      .onDelete("CASCADE")
      .notNullable();
    table
      .uuid("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .notNullable();
    table
      .uuid("cart_id")
      .references("id")
      .inTable("carts")
      .onDelete("CASCADE")
      .notNullable();
    table.decimal("amount").defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
    table
      .enum("status", ["Pedente", "Preparando", "Entregue"])
      .defaultTo("Pendente")
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("orders");
}
