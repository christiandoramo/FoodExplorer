import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { UserRegister } from "../pages/user-register";
import { Home } from "../pages/home";

export const UnsignedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}>
        <Route path="*" element={<Navigate to="/login" />} />
      </Route>
      <Route path="/user-register" element={<UserRegister />} />

      {/* {Somente para testes abaixo, essas rotas não serão acessíveis} */}

      <Route path="/home" element={<Home />}>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
