/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("ingredients", (table) => {
        table.uuid("id", { primaryKey: true });
        table.text("name").notNullable()
        table.uuid("product_id").references('id').inTable('products').onDelete('CASCADE').notNullable
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('ingredients')
};
