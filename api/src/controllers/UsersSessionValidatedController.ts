import { UsersRepository } from '../repositories/UsersRepository'
import { Request, Response, NextFunction } from 'express'
import { UsersSearchService } from '../services/UsersSearchService'
import { SessionsRefreshService } from '../services/SessionsRefreshService'
interface ExtendedRequest extends Request {
  user?: {
    role: string
    id: string;
  }
}

export class UsersSessionValidatedController {
  async index(request: ExtendedRequest, response: Response) {
    const { user } = request;
    if (!user)
      return response.status(401).json({error: 'Unauthorized'});
    const usersRepository = new UsersRepository()
    const usersSearchService = new UsersSearchService(usersRepository);
    await usersSearchService.execute(String(user.id))
    return response.status(200).json();
  }
  async update(request: ExtendedRequest, response: Response, next: NextFunction, refresh_token: string) {
    const { user } = request;
    if (!user)
      return response.status(401).json({error: 'Unauthorized'});
    const user_id = user.id
    const usersRepository = new UsersRepository()
    const sessionsRefreshService = new SessionsRefreshService(usersRepository);
    const credentials = await sessionsRefreshService.execute({ user_id, refresh_token });
    request.user = {
      id: credentials.user.id,
      role: credentials.user.role
    }
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
    return next()
}
}