import { toast } from "react-toastify";
import api from "./api";

class UserService {
  async registerUser(data: UserRegisterData): Promise<any> {
    try {
      const registerUserPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.post("users", data);
          await new Promise((res) => setTimeout(res, 2000));
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });

      return toast.promise(registerUserPromise, {
        pending: {
          render() {
            return `Criando sua conta 🤗`;
          },
          theme: "dark",
        },
        success: {
          render() {
            return `Conta criada com sucesso 👌`;
          },
        },
        error: {
          render({ data }: { data: any }) {
            return `${
              data?.response?.data?.message ||
              data?.message ||
              "Ocorreu um erro"
            }`;
          },
        },
      });
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
