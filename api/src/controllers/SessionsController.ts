import { Request, Response } from 'express'
import { UsersRepository } from '../repositories/UsersRepository'
import { SessionsCreateService } from '../services/SessionsCreateService'

export class SessionsController {
    async create(request: Request, response: Response) {
        const { email, password } = request.body
        const usersRepository = new UsersRepository()
        const sessionsCreateService = new SessionsCreateService(usersRepository);
        const credentials = await sessionsCreateService.execute({ email, password });
        response.cookie("@food-explorer/access_token", credentials.access_token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 30 * 60 * 1000, //token fica valido por 30 min, depois tem que gerar um novo
        })
        response.cookie("@food-explorer/user_id", credentials.user.id, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 30 * 60 * 1000, //token fica valido por 30 min, depois tem que gerar um novo
        })
        response.cookie("@food-explorer/refresh_token", credentials.refresh_token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, //refresh token fica por uma semana ate o proximo login
        })
        return response.status(201).json(credentials)
    }
}