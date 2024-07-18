import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { sessionsRoutes } from "./sessions.routes";
import { productsRoutes } from "./products.routes";
import { favoritesRoutes } from "./favorites.routes";
import { ordersRoutes } from "./orders.routes";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { refreshRoutes } from "./refresh.routes";

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/refresh-session", refreshRoutes);
routes.use("/products", ensureAuthenticated, productsRoutes);
routes.use("/favorites", ensureAuthenticated, favoritesRoutes);
routes.use("/orders", ensureAuthenticated, ordersRoutes);
export { routes };
