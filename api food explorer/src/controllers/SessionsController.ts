import { Request, Response } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
import { SessionsCreateService } from '../services/SessionsCreateService'

export class SessionsController {
    async create(request: Request, response: Response) {
        const { email, password } = request.body
        const usersRepository = new UsersRepository()
        const sessionsCreateService = new SessionsCreateService(usersRepository);
        const token = await sessionsCreateService.execute({ email, password });
        return response.status(201).json(token)
    }
}