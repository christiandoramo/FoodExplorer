/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("carts", (table) => {
        table.uuid("id", { primaryKey: true });
        table.uuid("user_id").references('id').inTable('users').onDelete('CASCADE').notNullable
        table.double("amount").defaultTo(0)
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP(0)'))
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP(0)'))
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('carts')
};
