import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";
import { ensureAuthorization } from "../middlewares/ensureAuthorization";

const productsRoutes = Router();
const productsController = new ProductsController();
productsRoutes.post("/", ensureAuthorization, productsController.create);
productsRoutes.delete("/:id", ensureAuthorization, productsController.delete);
productsRoutes.get("/:id", productsController.show);
productsRoutes.get("search", productsController.index);
export { productsRoutes };
