import { Request, Response, NextFunction } from "express";
import { USER_ROLES } from "../utils/Enums";

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
    console.log(error);
    throw error;
  }
}
