import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/:id", ensureAuthenticated, usersController.show);
export { usersRoutes };
