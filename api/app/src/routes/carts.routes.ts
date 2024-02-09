import { Router } from 'express'
import { CartsController } from '../controllers/CartsController'
import { UsersSessionValidatedController } from '../controllers/UsersSessionValidatedController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const cartsRoutes = Router()
const cartsController = new CartsController()
cartsRoutes.post("/", ensureAuthenticated, cartsController.create)
cartsRoutes.get("/", ensureAuthenticated, cartsController.show)
cartsRoutes.delete("/", ensureAuthenticated, cartsController.delete)
export { cartsRoutes }