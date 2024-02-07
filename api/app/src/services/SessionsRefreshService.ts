import { UsersRepository } from "../repositories/UsersRepository"
import AppError from "../utils/AppError"
import { sign, verify } from 'jsonwebtoken';
import authConfig from "../configs/auth";
import { UsersSearchService } from "./UsersSearchService";
import { compare } from "bcryptjs"

export class SessionsRefreshService {
    usersRepository
    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository
    }
    async execute({ user_id, refresh_token}: { user_id: string, refresh_token: string}) {
        if (!(user_id && refresh_token)) throw new AppError('Credentials not found', 401)
        const usersSearchService = new UsersSearchService(this.usersRepository)

        
        const user = await usersSearchService.execute(user_id)
        try{
            const oldRefreshToken = await this.usersRepository.findRefreshToken(user_id)
            if(refresh_token === oldRefreshToken){// compara refresh token no cookie com o no Banco para o id desse usuario
                const decoded = verify(oldRefreshToken, authConfig.jwt.refreshSecret) as { [key: string]: any }; // verifica se token e valido ainda
                if(decoded.id!==user_id) throw new AppError("0Invalid or Expired credentials",401) // usuario informou id falso ou errado
                const { secret, expiresIn, refreshExpiresIn, refreshSecret } = authConfig.jwt;
                const newAccess_token = sign({ id: String(user.id), role: user.role }, secret, { expiresIn });
                const newRefresh_token = sign({ id: String(user.id), role: user.role }, refreshSecret, { expiresIn: refreshExpiresIn })
                await this.usersRepository.saveRefreshToken(user.id,refresh_token) // salvando o token refresh gerado
                const newUser = await usersSearchService.execute(user_id)
                return { user: newUser, access_token: newAccess_token, refresh_token: newRefresh_token };
            }else{
                throw new AppError('1Invalid or Expired credentials', 401)
            }
        }catch{
            throw new AppError('2Invalid or Expired credentials', 401)
        }
    }
}