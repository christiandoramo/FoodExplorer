import { Request, Response } from 'express'
import { UsersCreateService } from '../services/UsersCreateService'
import { UsersRepository } from '../repositories/UsersRepository'
import { UsersSearchService } from '../services/UsersSearchService'

export class UsersController {
    async create(request: Request, response: Response) {
        const { name, email, password } = request.body
        const usersRepository = new UsersRepository()
        const usersCreateService = new UsersCreateService(usersRepository);
        const newUser = await usersCreateService.execute({ name, email, password })
        return response.status(201).json(newUser)
    }
    async show(request: Request, response: Response)  {
        const { id } = request.params
        const usersRepository = new UsersRepository()
        const usersSearchService = new UsersSearchService(usersRepository);
        const foundUser = await usersSearchService.execute(id)
        return response.status(200).json(foundUser)
    }
}