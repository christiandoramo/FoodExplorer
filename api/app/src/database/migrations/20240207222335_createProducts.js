/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("products", (table) => {
        table.increments("id")
        table.text("name").notNullable()
        table.text("description").notNullable()
        table.enum("category", ['vegetariano', 'salada','japonesa','nordestina','hambúrguer',
        'pizza','massa','bebida','refrigerante','gourmet','almoço','torta', 'other']).defaultTo('customer').notNullable()
        table.float("price").notNullable()
        table.text("avatar").notNullable()
        table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP(0)'))
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP(0)'))
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('products')
};
