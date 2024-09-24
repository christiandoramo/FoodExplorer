import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { UserRegister } from "../pages/user-register";
import { Error } from "../pages/error";

export const UnsignedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  );
};
