import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Criar uma sequência
  await knex.raw("CREATE SEQUENCE numeric_sequence");

  return knex.schema
    .table("orders", function (table) {
      table.dropColumn("status");
    })
    .table("orders", function (table) {
      table
        .enum("status", ["Pedente", "Preparando", "Entregue", "Cancelado"])
        .defaultTo("Pendente")
        .notNullable();
    })
    .table("orders", function (table) {
      table.enum("method", ["Crédito", "Pix"]);
    })
    .table("orders", function (table) {
      table
        .integer("code")
        .defaultTo(knex.raw("nextval('numeric_sequence')"))
        .unique();
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw("DROP SEQUENCE numeric_sequence");

  return knex.schema
    .table("orders", function (table) {
      table.dropColumn("status");
    })
    .table("orders", function (table) {
      table
        .enum("status", ["Pedente", "Preparando", "Entregue"])
        .defaultTo("Pendente")
        .notNullable();
    })
    .table("orders", function (table) {
      table.dropColumn("method");
    })
    .table("orders", function (table) {
      table.dropColumn("code");
    });
}
