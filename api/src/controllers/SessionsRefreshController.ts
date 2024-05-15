import { UsersRepository } from "../repositories/UsersRepository";
import { Request, Response, NextFunction } from "express";
import { UsersSearchService } from "../services/UsersSearchService";
import { SessionsRefreshService } from "../services/SessionsRefreshService";
import { parse } from "cookie";
import authConfig from "../configs/auth";
import AppError from "../utils/AppError";
import { verify } from "jsonwebtoken";

interface ExtendedRequest extends Request {
  user?: {
    role: string;
    id: string;
  };
}

export class SessionsRefreshController {
  async create(request: ExtendedRequest, response: Response) {
    try {
      const authHeader = request.headers;
      if (!authHeader || !authHeader?.cookie)
        throw new AppError("Sem autenticação", 401);
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
      const user_id = request.user.id;
      const usersRepository = new UsersRepository();
      const sessionsRefreshService = new SessionsRefreshService(
        usersRepository
      );

      const credentials = await sessionsRefreshService.execute(user_id);
      request.user = {
        id: credentials.user.id,
        role: credentials.user.role,
      };
      response.cookie("@food-explorer/user_id", credentials.user.id);
      response.cookie(
        "@food-explorer/refresh_token",
        credentials.refresh_token,
        {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, //refresh token fica por uma semana ate o proximo login
        }
      );

      return response.status(201).json({
        user_id: credentials.user.id,
        session_token: credentials.session_token,
      });
    } catch (err) {
      throw err;
    }
  }
}
