import { db } from './../database'

export class FavoritesRepository {
    async create({ userId, productId }: { userId: string, productId: string }) {
        const [result] = await db('favorites').insert({ user_id: userId, product_id: productId }).returning('id')
        return result.id
    }
    async findById(id: string) {
        return await db('favorites').where({ id }).first()
    }

    async findByUserAndProductId({ userId, productId }: { userId: string, productId: string }) {
        return await db('favorites').where({ user_id: userId, product_id: productId }).first()
    }

    async findAll(userId: string) {
        return await db('favorites').where({ user_id: userId })
    }
    async deleteById(id: string) {
        return await db('favorites').where({ id }).delete()
    }
}