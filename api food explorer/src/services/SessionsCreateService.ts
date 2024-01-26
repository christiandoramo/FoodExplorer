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
        if (!user) throw new AppError("1Email and/or password incorrect(s)", 401)
        const checkPassword: boolean = await compare(password, user.password)
        if (!checkPassword) throw new AppError("2Email and/or password incorrect(s)", 401)
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({ id: String(user.id), role: user.role }, secret, { expiresIn })
        delete user.password
        return token;
    }
}