import AppError from "../utils/AppError";
import { verify } from "jsonwebtoken";
import authConfig from "../configs/auth";
import { Request, Response, NextFunction } from 'express'

interface ExtendedRequest extends Request {
    user?:{
        role: string
        id: string;
    }
}

export function ensureAuthenticated(request: ExtendedRequest, response: Response, next: NextFunction) {
    const authHeader = request.headers
    if (!authHeader) throw new AppError('Valid JWT not found', 401)
    if (!authHeader.cookie) throw new AppError('Valid JWT not found', 401)
    // primeira posição é irrelevante
    const [, token] = authHeader.cookie.split('token=') //auth do tipo BEARER = "BEARER XXXTOKENXX"
    try {
        const decoded = verify(token, authConfig.jwt.secret) as { [key: string]: any };
        const { id, role } = decoded

        request.user = {
            id: id,
            role: role
        }
        return next()
    } catch {
        throw new AppError('Valid JWT not found', 401)
    }
}