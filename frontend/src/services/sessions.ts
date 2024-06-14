import api from "./api";
import { toast } from "react-toastify";
class SessionService {
  async login(data: UserLoginData): Promise<any> {
    // const resolveWithSomeData = new Promise(resolve => setTimeout(() => resolve("world"), 3000));
    try {
      const loginPromise = new Promise(async (resolve, reject) => {
        try {
          // Faz a requisição à API
          const response = await api.post("sessions", data);
          // Espera 2 segundos
          await new Promise((res) => setTimeout(res, 2000));
          // Resolve a promessa após a requisição e o timeout
          resolve(response);
        } catch (error) {
          // Rejeita a promessa se a requisição falhar
          reject(error);
        }
      });

      return toast.promise(loginPromise, {
        pending: {
          render() {
            return `Logando com ${data.email}`;
          },
          theme: "dark",
        },
        success: {
          render() {
            return `Logado com sucesso 👌`;
          },
          theme: "dark",
        },
        error: {
          render({ data }: { data: any }) {
            // When the promise reject, data will contains the error
            return `${
              data?.response?.data?.message ||
              data?.message ||
              "Ocorreu um erro"
            }`;
          },
          theme: "dark",
        },
      });
    } catch (error: any) {
      console.log(error);
      return error?.response?.message || error;
    }
  }
  async logoff(): Promise<any> {
    try {
      const response = await api.get("/sessions");
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error?.response?.message || error;
    }
  }
  async refreshSession(): Promise<any> {
    try {
      const response = await api.post("/refresh-session");
      return response.data;
    } catch (error: any) {
      console.log(error);
      return error?.response?.message || error;
    }
  }
}

export const sessionService = new SessionService();
