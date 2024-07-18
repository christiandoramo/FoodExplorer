import { Router } from "express";
import { OrdersController } from "../controllers/OrdersController";
import { ensureAuthorization } from "../middlewares/ensureAuthorization";

const ordersRoutes = Router();
const ordersController = new OrdersController();
ordersRoutes.post("/", ordersController.create);
ordersRoutes.get("/index", ordersController.indexCustomer);
ordersRoutes.get(
  "/index-admin",
  ensureAuthorization,
  ordersController.indexAdmin
);
ordersRoutes.get("/:id", ordersController.show);
export { ordersRoutes };
