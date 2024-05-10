import { CartsRepository } from "../repositories/CartsRepository"
import AppError from "../utils/AppError"

export class CartsCreateService {
    cartsRepository
    constructor(cartsRepository: CartsRepository) {
        this.cartsRepository = cartsRepository
    }
    async execute(userId: string) {
        const userCart = await this.cartsRepository.findCartByUserId(userId);
        if(userCart) {
            throw new AppError("User already have a cart", 400)
        }
        const newCartId = await this.cartsRepository.create(userId);
        const newCart = await this.cartsRepository.findCartById(newCartId);
        return newCart
    }
}