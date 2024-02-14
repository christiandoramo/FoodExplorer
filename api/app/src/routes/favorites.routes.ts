import { Router } from 'express'
import { FavoritesController } from '../controllers/FavoritesController'
import { UsersSessionValidatedController } from '../controllers/UsersSessionValidatedController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const favoritesRoutes = Router()
const favoritesController = new FavoritesController()
favoritesRoutes.post("/", ensureAuthenticated, favoritesController.create)
favoritesRoutes.get("/", ensureAuthenticated, favoritesController.index)
favoritesRoutes.delete("/", ensureAuthenticated, favoritesController.delete)
export { favoritesRoutes }