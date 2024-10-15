import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sessionService } from "../services/sessions";
import { userService } from "../services/users";
import api from "../services/api";

interface AuthContextData {
  signIn: (data: UserLoginData) => Promise<any>;
  signOut: () => void;
  user: User | null;
  refreshSign: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextData | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
  const [user, setUser] = useState<User | null>(null);
  const [, , removeCookie] = useCookies([
    "@food_explorer/refresh_token",
    "@food_explorer/user_id",
  ]);

  const signIn = async ({ email, password }: UserLoginData) => {
    const response = await sessionService.login({ email, password });
    if (!!response) {
      localStorage.setItem(
        "@food_explorer/session_token",
        response.data.session_token
      );
      localStorage.setItem("@food_explorer/user_id", response.data.user_id);
      api.defaults.headers.common = {
        Authorization: "Bearer " + response.data.session_token,
      };

      const foundUserPromise = new Promise((resolve) =>
        resolve(userService.getUserById(response.data.user_id))
      );

      const foundUser: any = await toast.promise(foundUserPromise, {
        pending: {
          render() {
            return `Buscando dados do usuário`;
          },
          icon: false,
          theme: "dark",
        },
        success: {
          render({ data }: { data: any }) {
            return `Olá, ${data?.name}! 🤗`;
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

      if (foundUser) {
        setUser(foundUser);
        navigate("/");
      }
    } else {
      toast.error(
        `Ocorreu um erro: ${response?.message || response?.response?.message}`
      );
    }
  };

  const signOut = async () => {
    if (!user) return;
    const response = await sessionService.logoff();
    if (response) {
      removeCookie("@food_explorer/refresh_token", { path: "/" });
      removeCookie("@food_explorer/user_id", { path: "/" });
      localStorage.removeItem("@food_explorer/session_token");
      localStorage.removeItem("@food_explorer/user_id");

      setUser(null);
      navigate("/");
    }
  };

  const refreshSign = async () => {
    try {
      const sessionToken = localStorage.getItem("@food_explorer/session_token");
      const userId = localStorage.getItem("@food_explorer/user_id");
      api.defaults.headers.common = {
        Authorization: "Bearer " + sessionToken,
      };

      if (!userId || !sessionToken) {
        throw new Error("Credenciais não verificadas");
      }

      api.defaults.withCredentials = true;
      const foundUserPromise = new Promise((resolve) =>
        resolve(userService.getUserById(userId))
      );

      const foundUser: User = await toast.promise(foundUserPromise, {
        pending: {
          render() {
            return `Buscando dados do usuário`;
          },
          icon: false,
          theme: "dark",
        },
        success: {
          render({ data }: { data: any }) {
            return `Olá novamente, ${data?.name} 1! 🤗`;
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

      if (foundUser) {
        setUser(foundUser);
        setLoading(false);
        navigate("/");
        return;
      }
    } catch (err) {
      api.defaults.withCredentials = false;
      throw err;
    }

    try {
      const response = await sessionService.refreshSession();
      if (!response) throw new Error("Refresh de sessão não concluído");
      localStorage.setItem(
        "@food_explorer/session_token",
        response.data.session_token
      );
      localStorage.setItem("@food_explorer/user_id", response.data.user_id);
      api.defaults.headers.common = {
        Authorization: "Bearer " + response.data.session_token,
      };

      api.defaults.withCredentials = true;

      const foundUserPromise = new Promise((resolve) =>
        resolve(userService.getUserById(response.data.user_id))
      );

      const foundUser: User = await toast.promise(foundUserPromise, {
        pending: {
          render() {
            return `Buscando dados do usuário`;
          },
          icon: false,
          theme: "dark",
        },
        success: {
          render({ data }: { data: any }) {
            return `Olá novamente, ${data.name} 2! 🤗`;
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

      if (!!foundUser) {
        setUser(foundUser);
        setLoading(false);
        navigate("/");
      }
    } catch (err) {
      api.defaults.withCredentials = false;
      navigate("/");
      toast.error(
        "Faz 1 semana que você não volta.\nPor favor, faça login novamente!"
      );
      throw err;
    } finally {
      setLoading(false); // Quando termina de buscar, remove o estado de carregamento
    }
  };
  useEffect(() => {
    refreshSign();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, refreshSign, user, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
