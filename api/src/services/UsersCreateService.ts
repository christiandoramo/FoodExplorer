import { UsersRepository } from "../repositories/UsersRepository"
import AppError from "../utils/AppError"
const { hash } = require("bcryptjs")

export class UsersCreateService {
    usersRepository
    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }
    async execute({ email, name, password }: { email: string, name: string, password: string }) {
        if (!(name && email && password)) throw new AppError('You must provide a name, email and password.', 400)
        const user = await this.usersRepository.findByEmail(email)
        if (user) throw new AppError("Unavailable email", 400)
        const hashedPassword: string = await hash(password, 8)
        const userId = await this.usersRepository.create({ name, email, password: hashedPassword })
        const newUser = await this.usersRepository.findById(userId);
        delete newUser.password
        return newUser
    }
}