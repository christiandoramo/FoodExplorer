import { db } from './../database'

export class UsersRepository {
    async create({ email, name, password }: { email: string, name: string, password: string }) {
        const [result] = await db('users').insert({ email, name, password }).returning('id')
        return result.id
    }
    async findByEmail(email: string) {
        return await db('users').where({ email }).first()
    }

    async findById(id: number) {
        return await db('users').where({ id }).first()
    }
}