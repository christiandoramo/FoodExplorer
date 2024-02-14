import { db } from './../database'

interface IngredientData {
    name: string;
}
export class CartsRepository {
    async create(userId: string) {
        const [result] = await db('carts').insert({ user_id: userId }).returning('id')
        return result.id
    }

    async findCartById(id: string) {
        const cart = await db('carts').where({ id });
        const items = await db('items_products').where({ cart_id: id });
        const cartWithItems = { cart, items }
        return cartWithItems
    }
    async findCartByUserId(userId: string) {
        const carts = await db('carts').where({ user_id: userId });
        const lastIndex = carts.length - 1
        const items = await db('items_products').where({ cart_id: carts[lastIndex].id });
        const cartWithItems = { cart: carts[lastIndex], items }
        return cartWithItems
    }

    async deleteCartById(id: string) {
        await db('items_products').where({ cart_id: id}).delete();
        await db('carts').where({ id}).delete();
        return 
    }
    async deleteCartByUserId(userId: string) {
        const carts = await db('carts').where({ user_id: userId });
        const lastIndex = carts.length - 1
        await db('items_products').where({ cart_id: carts[lastIndex].id }).delete();
        await db('carts').where({ id:carts[lastIndex].id}).delete();
        return
    }
    async deleteItemsFromCartByUserId(userId: string) {
        const carts = await db('carts').where({ user_id: userId });
        const lastIndex = carts.length - 1
        await db('items_products').where({ cart_id: carts[lastIndex].id }).delete();
        return
    }
}