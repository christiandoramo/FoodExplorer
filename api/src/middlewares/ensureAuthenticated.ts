import AppError from "../utils/AppError";
import { verify } from "jsonwebtoken";
import authConfig from "../configs/auth";
import { Request, Response, NextFunction} from 'express'
import { parse } from "cookie";
import { UsersSessionValidatedController } from "../controllers/UsersSessionValidatedController";

interface ExtendedRequest extends Request {
    user?:{
        role: string
        id: string;
    }
}

export async function ensureAuthenticated(request: ExtendedRequest, response: Response, next: NextFunction) {
    const authHeader = request.headers
    if (!authHeader) throw new AppError('Valid JWT not found', 401)
    if (!authHeader.cookie) throw new AppError('Valid JWT not found', 401)


    const cookies = parse(authHeader.cookie);
    const access_token = cookies['@food-explorer/access_token'];
    const refresh_Token = cookies['@food-explorer/refresh_token'];

    try {
        const decoded = verify(access_token, authConfig.jwt.secret) as { [key: string]: any };
        const { id, role } = decoded
        request.user = {
            id: id,
            role: role
        }
        return next()
    } catch(error: any){
        console.log(error)
        const userSessionValidatedController = new UsersSessionValidatedController()
        await userSessionValidatedController.update(request,response, next,refresh_Token)
    }
}