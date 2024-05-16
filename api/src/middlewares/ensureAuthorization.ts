import { Request, Response, NextFunction } from "express";
import { USER_ROLES } from "../enums/users";

interface ExtendedRequest extends Request {
  user?: {
    role: string;
    id: string;
  };
}

export async function ensureAuthorization(
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) {
  try {
    if (
      request?.user?.role !== USER_ROLES.ADMIN ||
      !request?.user?.role ||
      !request?.user
    )
      return response.status(403).json("Não autorizado");
    return next();
  } catch (error: any) {
    throw error;
  }
}
