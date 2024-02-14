import { db } from './../database'


export class PaymentsRepository {
    async create({ method, amount, cartId }: { method: string, cartId: string, amount: number }) {
        const [result] = await db('payments').insert({ method, cart_id: cartId, amount }).returning('id')
        return result.id
    }
}