import api from "./api";

class SessionService {
  async login(data: UserLoginData): Promise<any> {
    try {
      const response = await api.post("/sessions", data, {
        withCredentials: true,
      });
      return response.data;
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
