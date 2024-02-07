/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("carts", (table) => {
        table.increments("id")
        table.integer("user_id").references('id').inTable('users').onDelete('CASCADE').notNullable
        table.float("amount").defaultTo(0)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('carts')
};
