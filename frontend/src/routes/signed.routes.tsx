import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/home";
import { Error } from "../pages/error";
import { ProductInfo } from "../pages/product-info";

export const SignedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-info/:id" element={<ProductInfo />} />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  );
};
