import type { Knex } from "knex";
import { PRODUCT_CATEGORY } from "../../enums/category"; // Ajuste o caminho conforme necessário

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .table("products", function (table) {
      table.dropColumn("category");
    })
    .table("products", function (table) {
      table
        .enu(
          "category",
          [
            "Brasileira",
            "Vegana",
            "Vegetariana",
            "Salada",
            "Japonesa",
            "Chinesa",
            "Mexicana",
            "Nordestina",
            "Hambúrguer",
            "Pizza",
            "Massa",
            "Álcool",
            "Bebida",
            "Refrigerante",
            "Gourmet",
            "Almoço",
            "Italiana",
            "Indiana",
            "Árabe",
            "Torta",
            "Salgado",
            "Doce",
            "Grelhado",
            "Sanduíche",
            "Outros",
          ],
          {
            useNative: true,
            enumName: "product_category_enum", // Nome do tipo ENUM
          }
        )
        .notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .table("products", function (table) {
      table.dropColumn("category");
    })
    .table("products", function (table) {
      table
        .enu(
          "category",
          [
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
          ],
          {
            useNative: true,
            enumName: "product_category_enum", // Nome do tipo ENUM
          }
        )
        .notNullable();
    });
}
