import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("ingredients", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    table.text("name").notNullable();
    table
      .uuid("product_id")
      .references("id")
      .inTable("products")
      .onDelete("CASCADE").notNullable;
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("ingredients");
}
