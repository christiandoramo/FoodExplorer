import { UsersRepository } from "../repositories/UsersRepository"
import AppError from "../utils/AppError"
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken';
import authConfig from "../configs/auth";

export class SessionsCreateService {
    usersRepository
    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }
    async execute({ email, password }: { email: string, password: string }) {
        if (!(email && password)) throw new AppError('You must provide an email and password.', 400)
        const user = await this.usersRepository.findByEmail(email)
        if (!user) throw new AppError("Email and/or password incorrect(s)", 401)
        const checkPassword: boolean = await compare(password, user.password)
        if (!checkPassword) throw new AppError("Email and/or password incorrect(s)", 401)
        const { secret, expiresIn, refreshExpiresIn, refreshSecret } = authConfig.jwt;
        const access_token = sign({ id: String(user.id), role: user.role }, secret, { expiresIn });
        const refresh_token = sign({ id: String(user.id), role: user.role }, refreshSecret, { expiresIn: refreshExpiresIn })
        await this.usersRepository.saveRefreshToken(user.id,refresh_token) // salvando o token refresh gerado

        delete user.password
        return { user, access_token, refresh_token };
    }
}