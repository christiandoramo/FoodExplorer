import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products", (table) => {
    table.uuid("id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    table.text("name").notNullable();
    table.text("description").notNullable();
    table
      .enum("category", [
        "brasileira",
        "vegana",
        "vegetariana",
        "salada",
        "japonesa",
        "chinesa",
        "mexicana",
        "nordestina",
        "hambúrguer",
        "pizza",
        "massas",
        "álcool",
        "bebidas",
        "refrigerantes",
        "gourmet",
        "almoço",
        "italiana",
        "tortas",
        "salgados",
        "doces",
        "grelhados",
        "sanduíche",
        "outros",
      ])
      .notNullable();
    table.decimal("price").notNullable();
    table.text("avatar").notNullable();
    table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
    table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP(0)"));
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("products");
}
