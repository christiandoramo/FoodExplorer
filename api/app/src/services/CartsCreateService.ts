import { CartsRepository } from "../repositories/CartsRepository"
import AppError from "../utils/AppError"

interface IngredientData {
    name: string;
}

export class ProductsCreateService {
    cartsRepository
    constructor(cartsRepository: CartsRepository) {
        this.cartsRepository = cartsRepository
    }
    async execute(user_id: string) {
        const newCartId = await this.cartsRepository.create(user_id);
        const newCart = await this.cartsRepository.findCartById(newCartId);
        return newCart
    }
}