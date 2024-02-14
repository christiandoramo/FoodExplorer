import { db } from './../database'


export class PaymentsRepository {
    async create({ method, amount, user_id }: { method: string, user_id: string, amount: number }) {
        const carts = await db('carts').where({ user_id })
        const cart = carts[carts.length - 1] // garantindo que vai pegar o Cart mais atual do usuario
        const [result] = await db('payments').insert({ method, cart_id: cart.id, amount }).returning('id')
        return result.id
    }

    async findById(id: string) {
        return await db('payments').where({ id }).first()
    }
}