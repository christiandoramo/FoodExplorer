import { db } from "../database";

export class UsersRepository {
  async create({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) {
    const [result] = await db("users")
      .insert({ email, name, password })
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
