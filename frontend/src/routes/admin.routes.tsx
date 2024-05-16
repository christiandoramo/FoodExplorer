import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/home";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
      {/* <Route path="/estabelecimento/:id" element={<Estabelecimento />} /> */}
    </Routes>
  );
};
