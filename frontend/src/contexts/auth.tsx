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
  const [, , removeCookie] = useCookies(["@food_explorer/refresh_token"]);

  const signIn = async ({ email, password }: UserLoginData) => {
    try {
      toast.loading("Realizando login");
      const response = await sessionService.login({ email, password });
      if (response) {
        api.defaults.withCredentials = true;
        localStorage.setItem(
          "@food_explorer/session_token",
          JSON.stringify(response.data.session_token)
        );
        const foundUser: User = await toast.promise(
          () => userService.getUserById(response.data.user_id),
          {
            pending: "logando",
            success: "Logado com sucesso 👌",
            error: "Ocorreu um erro: ",
          }
        );
        if (foundUser) {
          setUser(foundUser);
          toast.success("Login realizado com sucesso");
          navigate("/home");
        }
      } else {
        toast.error(
          `Ocorreu um erro: ${response?.message || response?.response?.message}`
        );
      }
    } catch (e: any) {
      if (e.response) {
        toast.error(e.response.data.message);
      } else {
        console.error("Ocorreu um erro: ", e);
      }
    }
  };

  const signOut = async () => {
    const response = await toast.promise(sessionService.logoff, {
      pending: "Deslogando",
      success: "Deslogado com sucesso 👌",
      error: "Ocorreu um erro: ",
    });
    if (response) {
      removeCookie("@food_explorer/refresh_token", { path: "/" });
      localStorage.removeItem("@food_explorer/session_token");
      setUser({ email: "", id: "", name: "", role: "" });
      api.defaults.withCredentials = false;
      toast.warning("Deslogado com sucesso");
      navigate("/login");
    } else {
      toast.warning("Ocorreu um problema");
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
    reconnect();
  }, []);

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
