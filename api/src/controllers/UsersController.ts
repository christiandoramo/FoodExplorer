import { Request, Response } from "express";
import { UsersCreateService } from "../services/UsersCreateService";
import { UsersRepository } from "../repositories/UsersRepository";
import { UsersSearchService } from "../services/UsersSearchService";

interface ExtendedRequest extends Request {
  user?: {
    role: string;
    id: string;
  };
}

export class UsersController {
  async create(request: Request, response: Response) {
    const { name, email, password, role } = request.body;
    const usersRepository = new UsersRepository();
    const usersCreateService = new UsersCreateService(usersRepository);
    const newUser = await usersCreateService.execute({
      name,
      email,
      password,
      role,
    });
    return response.status(201).json(newUser);
  }
  async show(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    const { role } = request.body;
    const usersRepository = new UsersRepository();
    const usersSearchService = new UsersSearchService(usersRepository);
    const foundUser = await usersSearchService.execute(id, role);
    return response.status(200).json(foundUser);
  }
}
