import { UsersRepository } from "../repositories/UsersRepository";
import AppError from "../utils/AppError";
const { hash } = require("bcryptjs");
import * as z from "zod";

// Defina o esquema usando Zod
const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(3),

  // password: z
  // .string()
  // .min(5, "Pelo menos 5 caracteres")
  // .regex(/[A-Z]/, "Pelo menos uma letra maiúscula")
  // .regex(/[0-9]/, "Pelo menos um número"),
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
