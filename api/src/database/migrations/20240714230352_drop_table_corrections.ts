import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .table("items_products", function (table) {
      table.dropColumn("cart_id");
    })
    .table("orders", function (table) {
      table.dropColumn("cart_id");
    })
    .table("orders", function (table) {
      table.dropColumn("payment_id");
    })
    .dropTable("payments")
    .dropTable("carts");
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("carts", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table
        .uuid("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .notNullable();
      table.decimal("amount").defaultTo(0);
      table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
      table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
    })
    .createTable("payments", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.enum("method", ["Cartâo de Crédito", "Pix"]);
      table.decimal("amount").notNullable();
      table.uuid("cart_id").references("id").inTable("carts").notNullable();
      table.timestamp("date").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
    })
    .table("orders", function (table) {
      table
        .uuid("payment_id")
        .references("id")
        .inTable("payments")
        .onDelete("CASCADE");
    })
    .table("orders", function (table) {
      table
        .uuid("cart_id")
        .references("id")
        .inTable("carts")
        .onDelete("CASCADE");
    })
    .table("items_products", function (table) {
      table
        .uuid("cart_id")
        .references("id")
        .inTable("carts")
        .onDelete("CASCADE");
    });
}
