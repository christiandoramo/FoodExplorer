/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id")
        table.text("name").notNullable()
        table.text("email").notNullable()
        table.text("password").notNullable()
        table.text("avatar")
        table.enum("role", ['customer', 'admin', 'other']).defaultTo('customer').notNullable()
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP(0)'))
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP(0)'))
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users')
};
