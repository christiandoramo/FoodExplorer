import { Router } from "express";
import { CartsController } from "../controllers/CartsController";

const cartsRoutes = Router();
const cartsController = new CartsController();
cartsRoutes.post("/", cartsController.create);
cartsRoutes.get("/", cartsController.show);
cartsRoutes.delete("/", cartsController.delete);
export { cartsRoutes };
