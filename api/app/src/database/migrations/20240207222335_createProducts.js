/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("products", (table) => {
        table.uuid("id", { primaryKey: true });
        table.text("name").notNullable()
        table.text("description").notNullable()
        table.enum("category", ['brasileira','vegana','vegetariana', 'salada','japonesa','chinesa','mexicana','nordestina','hambúrguer',
        'pizza','massas','álcool','bebidas','refrigerantes','gourmet','almoço','italiana','tortas','salgados' ,'doces','grelhados','sanduíche','outros']).notNullable()
        table.double("price").notNullable()
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
