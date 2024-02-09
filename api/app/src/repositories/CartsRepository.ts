import { db } from './../database'

interface IngredientData {
    name: string;
}
export class CartsRepository {
    async create(userId: string) {
        const [result] = await db('carts').insert({ user_id: Number(userId) }).returning('id')
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

    async updateCart(newAmount: number, cartId: string) {
        return await db('carts').update({ amount: newAmount }).where({ id: Number(cartId) })
        // quem será atualizado realmente serão os itens que apontam para o cart que vão deixar de existir

    }
    async deleteCartById(id: string) {
        return await db('carts').where({ id: Number(id) }).delete();
    }
    async deleteCartByUserId(userId: string) {
        return await db('carts').where({ user_id: Number(userId) }).delete();
    }
}