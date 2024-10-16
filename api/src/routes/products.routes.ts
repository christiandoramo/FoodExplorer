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
productsRoutes.patch(
  "/update/:id",
  upload.single("file"),
  ensureAuthorization,
  productsController.update
);
productsRoutes.delete(
  "/delete/:id",
  ensureAuthorization,
  productsController.delete
);
productsRoutes.get("/categories", productsController.findAllCategories);
productsRoutes.get("/show/:id", productsController.show);
productsRoutes.get("/search", productsController.search); // traz com filtros ou todos
productsRoutes.get("/index", productsController.index); // traz produtos categorizado

export { productsRoutes };
