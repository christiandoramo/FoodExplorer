import { Router } from 'express'
import { UsersController } from '../controllers/UsersController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { UsersSessionValidatedController } from '../controllers/UsersSessionValidatedController'


const usersRoutes = Router()
const usersController = new UsersController()
const usersSessionValidatedController = new UsersSessionValidatedController();
usersRoutes.post("/", usersController.create)
usersRoutes.get("/:id", usersController.show)
usersRoutes.get("/validated", ensureAuthenticated, usersSessionValidatedController.index);
export { usersRoutes }