import { UsersRepository } from "../repositories/UsersRepository"
import AppError from "../utils/AppError"

export class UsersSearchService {
    usersRepository
    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }
    async execute(id: string) {
        if (!id) throw new AppError('Invalid params', 400)
        if (id) throw new AppError('Invalid params', 400)
        const user = await this.usersRepository.findById(id)
        if (!user) throw new AppError("User not found", 404)
        delete user.password
        return user;
    }
}