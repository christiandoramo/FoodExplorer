import { Request, Response } from 'express'
import { UsersCreateService } from '../services/UsersCreateService'
import { UsersRepository } from '../repositories/UsersRepository'

export class UsersController {
    async create(request: Request, response: Response) {
        const { name, email, password } = request.body
        const usersRepository = new UsersRepository()
        const usersCreateService = new UsersCreateService(usersRepository);
        const newUser = await usersCreateService.execute({ name, email, password })
        return response.status(201).json(newUser)
    }
}