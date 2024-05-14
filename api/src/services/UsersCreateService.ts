import { UsersRepository } from "../repositories/UsersRepository";
import AppError from "../utils/AppError";
const { hash } = require("bcryptjs");
import * as z from "zod";

// Defina o esquema usando Zod
const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(), // Certifica-se de que o e-mail está em um formato válido
  password: z.string().min(3), // Exige que a senha tenha pelo menos 6 caracteres
});

export class UsersCreateService {
  usersRepository;
  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) {
    try {
      createUserSchema.parse({ name, email, password });
    } catch (error: any) {
      console.error(error.errors.map((err: any) => err.message).join(", "));
      throw new AppError("Insira dados válidos para se registrar", 400);
    }

    try {
      const user = await this.usersRepository.findByEmail(email);
      if (user) throw new AppError("Email indisponível", 400);
      const hashedPassword: string = await hash(password, 8);
      const userId = await this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
      });
      const newUser = await this.usersRepository.findById(userId);
      delete newUser.password;
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
