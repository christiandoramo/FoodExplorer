import { Router } from 'express'

import { usersRoutes } from './users.routes'
import { sessionsRoutes } from './sessions.routes'
import { productsRoutes } from './products.routes'
import { cartsRoutes } from './carts.routes'



const routes = Router()
routes.use("/users", usersRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/products', productsRoutes)
routes.use('/carts', cartsRoutes)
export { routes }