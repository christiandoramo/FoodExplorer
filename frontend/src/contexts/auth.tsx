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
  user: User;
}

const AuthContext = createContext<AuthContextData | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    email: "",
    id: "",
    name: "",
    role: "",
  });
  const [, , removeCookie] = useCookies([
    "@food_explorer/refresh_token",
    "@food_explorer/user_id",
  ]);

  const signIn = async ({ email, password }: UserLoginData) => {
    const response = await sessionService.login({ email, password });
    if (response) {
      localStorage.setItem(
        "@food_explorer/session_token",
        JSON.stringify(response.data.session_token)
      );
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
        navigate("/home");
      }
    } else {
      // toast.error(
      //   `Ocorreu um erro: ${response?.message || response?.response?.message}`
      // );
    }
  };

  const signOut = async () => {
    if (!user) return;
    const response = await sessionService.logoff();
    if (response) {
      removeCookie("@food_explorer/refresh_token", { path: "/" });
      removeCookie("@food_explorer/user_id", { path: "/" });
      localStorage.removeItem("@food_explorer/session_token");
      setUser({ email: "", id: "", name: "", role: "" });
      navigate("/login");
    }
  };

  useEffect(() => {
    async function reconnect() {
      const user_id = localStorage.getItem("@food_explorer/user_id") || null;
      const session_token =
        localStorage.getItem("@food_explorer/session_token") || null;
      if (user_id != null && session_token !== null) {
        api.defaults.withCredentials = true;
        const response = await toast.promise(sessionService.refreshSession, {
          pending: "Recuperando sessão",
          error: "Ocorreu um erro: ",
        });
        if (response) {
          const foundUser: User = await toast.promise(
            () => userService.getUserById(response.user_id),
            {
              pending: "Buscando usuário",
              success: "Relogado novamento com sucesso",
              error: "Ocorreu um erro: ",
            }
          );
          if (foundUser) {
            setUser(foundUser);
          }
        }
      }
    }
    if (!user) reconnect();
  }, [user]);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
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
