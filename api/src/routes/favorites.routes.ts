import { Router } from "express";
import { FavoritesController } from "../controllers/FavoritesController";

const favoritesRoutes = Router();
const favoritesController = new FavoritesController();
favoritesRoutes.post("/", favoritesController.create);
favoritesRoutes.get("/", favoritesController.index);
favoritesRoutes.delete("/", favoritesController.delete);
export { favoritesRoutes };
