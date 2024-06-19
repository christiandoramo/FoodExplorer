import api from "./api";
import { toast } from "react-toastify";
class SessionService {
  async login(data: UserLoginData): Promise<any> {
    try {
      const loginPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.post("sessions", data);
          await new Promise((res) => setTimeout(res, 2000));
          resolve(response);
        } catch (error) {
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
  async logoff(): Promise<any> {
    try {
      const logoffPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.get("sessions");
          await new Promise((res) => setTimeout(res, 2000));
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });

      return toast.promise(logoffPromise, {
        pending: {
          render() {
            return `Desconectando, aguarde!`;
          },
          theme: "dark",
        },
        success: {
          render() {
            return `Você está desconectado`;
          },
          theme: "dark",
        },
        error: {
          render({ data }: { data: any }) {
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
