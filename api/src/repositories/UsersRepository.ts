import { USER_ROLES } from "../enums/users";
import { db } from "../database";

export class UsersRepository {
  async create({
    email,
    name,
    password,
    role,
  }: {
    email: string;
    name: string;
    password: string;
    role?: USER_ROLES;
  }) {
    console.log("role ?? USER_ROLES.DEFAULT: ", role ?? USER_ROLES.DEFAULT);
    const [result] = await db("users")
      .insert({ email, name, password, role: role ?? USER_ROLES.DEFAULT })
      .returning(["id"]);
    return result.id;
  }
  async findByEmail(email: string) {
    return await db("users").where({ email }).first();
  }

  async findById(id: string) {
    return await db("users").where({ id }).first();
  }
  async saveRefreshToken(userId: string, refresh_token: string) {
    await db("users")
      .where({ id: userId })
      .update({ refresh_token: refresh_token });
  }

  async findRefreshToken(userId: string) {
    const user = await db("users").where({ id: userId }).first();
    return user.refresh_token;
  }

  async deleteRefreshToken(userId: string) {
    return await db("users")
      .where({ id: userId })
      .update({ refresh_token: null });
  }
}
