import { CartsRepository } from "../repositories/CartsRepository"
import AppError from "../utils/AppError"

interface IngredientData {
    name: string;
}

export class CartsDeleteService {
    cartsRepository
    constructor(cartsRepository: CartsRepository) {
        this.cartsRepository = cartsRepository
    }
    async execute(userId: string) {
        try {
            const cartWithItems = await this.cartsRepository.findCartByUserId(userId);
            if (cartWithItems) {
                await this.cartsRepository.deleteCartById(cartWithItems.cart.id);
                return
            } else {
                throw new AppError("Cart not found", 404)
            }
        } catch (e: any) {
            if (!(e instanceof AppError))
                throw new Error('Error: ' + e)

        }


    }
}