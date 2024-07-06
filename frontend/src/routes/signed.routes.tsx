import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/home";
import { Error } from "../pages/error";

export const SignedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  );
};
