import api from "./api";

class UserService {
  async registerUser(data: UserRegisterData): Promise<any> {
    try {
      const response = await api.post("/users", data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error?.response?.message || error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error?.response?.message || error;
    }
  }
}

export const userService = new UserService();
