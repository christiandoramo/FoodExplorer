import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";
import { ensureAuthorization } from "../middlewares/ensureAuthorization";
import multer from "multer";
import { MULTER } from "../configs/upload";

const upload = multer(MULTER);

const productsRoutes = Router();
const productsController = new ProductsController();
productsRoutes.post(
  "/",
  upload.single("file"),
  ensureAuthorization,
  productsController.create
);
productsRoutes.delete("/:id", ensureAuthorization, productsController.delete);
productsRoutes.get("/:id", productsController.show);
productsRoutes.get("search", productsController.index);
export { productsRoutes };
