import { Request, Response } from 'express'
import { CartsCreateService } from '../services/CartsCreateService'
import { CartsDeleteService } from '../services/CartsDeleteService'
import { CartsSearchService } from '../services/CartsSearchService'
import { CartsRepository } from '../repositories/CartsRepository'

interface ExtendedRequest extends Request {
    user?: {
        role: string
        id: string;
    }
}

export class CartsController {
    async create(request: ExtendedRequest, response: Response) {
        const { user } = request
        if (!user)
            return response.status(401).json({ error: 'Unauthorized' });
        const cartsRepository = new CartsRepository()
        const cartsCreateService = new CartsCreateService(cartsRepository);
        const newCart = await cartsCreateService.execute(user.id)
        return response.status(200).json(newCart)
    }
    async show(request: ExtendedRequest, response: Response) {
        const { user } = request
        if (!user)
            return response.status(401).json({ error: 'Unauthorized' });
        const cartsRepository = new CartsRepository()
        const cartsSearchService = new CartsSearchService(cartsRepository);
        const cart = await cartsSearchService.execute(user.id)
        return response.status(200).json(cart)
    }

    async delete(request: ExtendedRequest, response: Response) {
        const { user } = request
        if (!user)
            return response.status(401).json({ error: 'Unauthorized' });
        const cartsRepository = new CartsRepository()
        const cartsDeleteService = new CartsDeleteService(cartsRepository);
        await cartsDeleteService.execute(user.id)
        return response.status(200).json()
    }
}