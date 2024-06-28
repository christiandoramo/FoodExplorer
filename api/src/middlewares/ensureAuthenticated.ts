import AppError from "../utils/AppError";
import { verify } from "jsonwebtoken";
import authConfig from "../configs/auth";
import { Request, Response, NextFunction } from "express";
import { SessionsRefreshController } from "../controllers/SessionsRefreshController";

interface ExtendedRequest extends Request {
  user?: {
    role: string;
    id: string;
  };
}

export async function ensureAuthenticated(
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request?.headers?.authorization;

    if (!authHeader) throw new AppError("Não autenticado", 401);
    // primeira posição é irrelevante
    const [, session_token] = authHeader.split(" "); //auth do tipo BEARER = "BEARER XXXTOKENXX"
    const decoded = verify(session_token, authConfig.jwt.secret) as {
      [key: string]: any;
    };
    const { id, role } = decoded;
    // if (request?.user?.id !== id || request?.user?.role !== role) {
    //   throw new AppError("Não autenticado", 401);
    // }
    request.user = { id, role };
    return next();
  } catch (error) {
    // faltando tirar redirecionar e colocar serviço de refresh session diretamente
    // isso apenas está redirecionando o navegador para o url do backend + /refresh-session
    // nao está fazendo o uso do axios...
    console.log("entrou aqui: ", error);
    const sessionsRefreshController = new SessionsRefreshController();
    sessionsRefreshController.create(request, response);
    return;
  }
}
