import { USER_ROLES } from "../enums/users";
import { UsersRepository } from "../repositories/UsersRepository";
import AppError from "../utils/AppError";

export class UsersSearchService {
  usersRepository;
  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute(id: string, role: string) {
    const user = await this.usersRepository.findById(id);
    if (user?.id !== id && role !== USER_ROLES.ADMIN)
      throw new AppError("Não autorizado", 403);
    if (!user) throw new AppError("Usuário não encontrado", 404);

    delete user.password;
    return user;
  }
}
