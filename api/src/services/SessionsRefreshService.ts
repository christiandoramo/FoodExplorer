import { UsersRepository } from "../repositories/UsersRepository";
import AppError from "../utils/AppError";
import { sign, verify } from "jsonwebtoken";
import authConfig from "../configs/auth";
import { UsersSearchService } from "./UsersSearchService";

export class SessionsRefreshService {
  usersRepository;
  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute(user_id: string) {
    try {
      const user = await this.usersRepository.findById(user_id);
      if (!user) throw new AppError("Usuário não encontrado", 404);
      const { secret, expiresIn, refreshExpiresIn, refreshSecret } =
        authConfig.jwt;
      const session_token = sign(
        { id: String(user.id), role: user.role },
        secret,
        { expiresIn }
      );
      const refresh_token = sign(
        { id: user.id, role: user.role },
        refreshSecret,
        { expiresIn: refreshExpiresIn }
      );
      await this.usersRepository.saveRefreshToken(user.id, refresh_token); // salvando o token refresh gerado

      delete user.password;
      return { user, session_token, refresh_token };
    } catch (error) {
      throw error;
    }
  }
}
