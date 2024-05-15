import { UsersRepository } from "../repositories/UsersRepository";
import AppError from "../utils/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../configs/auth";

export class SessionsExitService {
  usersRepository;
  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute(id: string) {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user)
        throw new AppError(
          "Ocorreu um erro, o usuário não foi encontrado",
          404
        );
      return await this.usersRepository.deleteRefreshToken(id);
    } catch (error) {
      throw error;
    }
  }
}
