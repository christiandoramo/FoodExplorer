import { Request, Response } from "express";
import { UsersRepository } from "../repositories/UsersRepository";
import { SessionsCreateService } from "../services/SessionsCreateService";
import { parse } from "cookie";
import AppError from "../utils/AppError";
import authConfig from "../configs/auth";
import { verify } from "jsonwebtoken";
import { SessionsExitService } from "../services/SessionsExitService";

interface ExtendedRequest extends Request {
  user?: {
    role: string;
    id: string;
  };
}

export class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const usersRepository = new UsersRepository();
    const sessionsCreateService = new SessionsCreateService(usersRepository);

    const credentials = await sessionsCreateService.execute({
      email,
      password,
    });
    response.cookie("@food-explorer/user_id", credentials.user.id, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 30 * 60 * 1000, //token fica valido por 30 min, depois tem que gerar um novo
    });
    response.cookie("@food-explorer/refresh_token", credentials.refresh_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //refresh token fica por uma semana ate o proximo login
    });

    return response.status(201).json({
      user_id: credentials.user.id,
      session_token: credentials.session_token,
    });
  }

  async exit(request: ExtendedRequest, response: Response) {
    try {
      const authHeader = request.headers;
      console.log(authHeader?.cookie);
      if (!authHeader || !authHeader?.cookie)
        throw new AppError("Sem autenticação 1", 401);
      const cookies = parse(authHeader.cookie);
      const refresh_token = cookies["@food-explorer/refresh_token"];

      if (!refresh_token) return response.status(401).json("Sem autenticação");

      const decoded = verify(refresh_token, authConfig.jwt.refreshSecret) as {
        [key: string]: any;
      };

      const { id, role } = decoded;
      request.user = {
        id: id,
        role: role,
      };
      const userId = request.user.id;
      const usersRepository = new UsersRepository();
      const sessionsExitService = new SessionsExitService(usersRepository);

      await sessionsExitService.execute(userId); // está apagando o refreshtoken do usuário

      response.cookie("@food-explorer/user_id", "", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(0),
      });

      return response
        .status(200)
        .cookie("@food-explorer/refresh_token", "", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          expires: new Date(0),
        })
        .json("Deslogado com sucesso");
    } catch (err) {
      throw err;
    }
  }
}
