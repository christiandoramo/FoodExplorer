import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("items_products", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    table
      .uuid("product_id")
      .references("id")
      .inTable("products")
      .onDelete("CASCADE")
      .notNullable();
    table
      .uuid("cart_id")
      .references("id")
      .inTable("carts")
      .onDelete("CASCADE")
      .notNullable();
    table.decimal("amount").defaultTo(0);
    table.integer("quantity").notNullable();
    table.timestamp("add_date").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("items_products");
}
