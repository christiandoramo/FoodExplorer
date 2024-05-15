import AppError from "../utils/AppError";
import { verify } from "jsonwebtoken";
import authConfig from "../configs/auth";
import { Request, Response, NextFunction } from "express";

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
    request.user = {
      id: id,
      role: role,
    };

    return next();
  } catch (error) {
    return response.redirect("refresh-session");
  }
}
