import { db } from './../database'
import crypto from 'crypto'

export class UsersRepository {
    async create({ email, name, password }: { email: string, name: string, password: string }) {
        const [result] = await db('users').insert({ email, name, password }).returning('id')
        await db('carts').insert({ user_id: result.id }) // usuario inicia ja com um carrinho vazio
        return result.id
    }
    async findByEmail(email: string) {
        return await db('users').where({ email }).first()
    }

    async findById(id: string) {
        return await db('users').where({ id }).first()
    }
    async saveRefreshToken(userId: number, refresh_token: string) {
        // Criptografe o refresh token antes de salvá-lo
        const cipher = crypto.createCipher('aes-256-cbc', process.env.REFRESH_SECRET || 'a password');
        let encrypted = cipher.update(refresh_token, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        await db('users').where({ id: userId }).update({ refresh_token: encrypted })
    }

    async findRefreshToken(userId: string) {
        const user = await db('users').where({ id: userId }).first()
        // Descriptografe o refresh token antes de retorná-lo
        const decipher = crypto.createDecipher('aes-256-cbc', process.env.REFRESH_SECRET || 'a password');
        let decrypted = decipher.update(user.refresh_token, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted
    }
}