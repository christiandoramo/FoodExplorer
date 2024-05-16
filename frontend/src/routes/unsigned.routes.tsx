import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { UserRegister } from "../pages/user-register";

export const UnsignedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}>
        <Route path="*" element={<Navigate to="/login" />} />
      </Route>
      <Route path="/user-register" element={<UserRegister />} />
    </Routes>
  );
};
