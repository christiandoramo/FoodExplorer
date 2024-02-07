import { db } from './../database'

interface IngredientData {
    name: string;
}
export class CartsRepository {
    async create(user_id : string) {
        const [result] = await db('carts').insert({ user_id: Number(user_id) }).returning('id')
        return result.id
    }

    async findCartById(id: string) {
        const cart = await db('carts').where({ id });
        const items = await db('items_products').where({ cart_id: id });
        return { ...cart, items }
    }

    async updateCart(newAmount: number, cartId: string) {
        return await db('carts').update({ amount: newAmount }).where({ id: Number(cartId) })
        // quem será atualizado realmente serão os itens que apontam para o cart que vão deixar de existir

    }
    async deleteCart(id: string) {
        return await db('carts').where({ id: Number(id) }).delete();
    }
}