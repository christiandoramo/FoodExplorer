import { Router } from 'express'
import { ProductsController } from '../controllers/ProductsController'
import { UsersSessionValidatedController } from '../controllers/UsersSessionValidatedController'


const productsRoutes = Router()
const productsController = new ProductsController()
productsRoutes.post("/", productsController.create)
productsRoutes.get("/:id", productsController.show)
productsRoutes.get("search", productsController.index)
export { productsRoutes }