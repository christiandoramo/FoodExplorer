import { UsersRepository } from "../repositories/UsersRepository";
import AppError from "../utils/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../configs/auth";

import * as z from "zod";

// Defina o esquema usando Zod
const createSessionSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export class SessionsCreateService {
  usersRepository;
  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({ email, password }: { email: string; password: string }) {
    try {
      createSessionSchema.parse({ email, password });
    } catch (error: any) {
      console.error(error.errors.map((err: any) => err.message).join(", "));
      throw new AppError("Insira dados válidos para fazer login", 400);
    }
    try {
      const user = await this.usersRepository.findByEmail(email);
      if (!user) throw new AppError("Email e/ou senha inválido(s)", 401);
      const checkPassword: boolean = await compare(password, user.password);
      if (!checkPassword)
        throw new AppError("Email e/ou senha inválido(s)", 401);
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
