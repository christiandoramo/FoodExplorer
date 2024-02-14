import { db } from './../database'

export class FavoritesRepository {
    async create({ user_id, product_id }: { user_id: string, product_id: string }) {
        const [result] = await db('favorites').insert({ user_id, product_id }).returning('id')
        return result.id
    }
    async findById(id: string) {
        return await db('users').where({ id }).first()
    }

    async findAll(userId: string) {
        return await db('favorites').where({ user_id: userId })
    }
    async deleteById(id: string) {
        return await db('favorites').where({ id }).delete()
    }
}