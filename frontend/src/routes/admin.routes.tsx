import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/home";
import { ProductCreate } from "../pages/product-create";
import { Error } from "../pages/error";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-create" element={<ProductCreate />} />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  );
};
