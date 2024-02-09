import { db } from './../database'

interface IngredientData {
    name: string;
}
export class ItemsProductsRepository{
    async create(cartId: string) {
        const [result] = await db('items_products').insert({ cart_id: Number(cartId) }).returning('id')
        return result.id
    }

    async findById(id: string) {
        const cart = await db('carts').where({ id });
        const items = await db('items_products').where({ cart_id: id });
        const cartWithItems = { cart, items }
        return cartWithItems
    }
    async deleteCart(id: string) {
        return await db('carts').where({ id: Number(id) }).delete();
    }
}