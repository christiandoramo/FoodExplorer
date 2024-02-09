import { CartsRepository } from "../repositories/CartsRepository"
import AppError from "../utils/AppError"
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ProductsSearchService } from "./ProductsSearchService";

interface IngredientData {
    name: string;
}

export class CartsSearchService {
    cartsRepository
    constructor(cartsRepository: CartsRepository) {
        this.cartsRepository = cartsRepository
    }
    async execute(userId: string) {
        try {
            const { cart, items } = await this.cartsRepository.findCartByUserId(userId);
            if (cart) {
                if (items.length > 0) {
                    const productReposiroty = new ProductsRepository()
                    const productsSearchService = new ProductsSearchService(productReposiroty)
                    const itemsWithProducts = items.map(async (item) => {
                        const product = await productsSearchService.execute({ id: item.product_id });
                        item.amount = product.amount * item.quantity
                        return {
                            item,
                            product,
                        }
                    })
                    return { cart, itemsWithProducts }
                }
                return cart
            } else {
                throw new AppError("Cart not found", 404)
            }
        } catch (e: any) {
            if (!(e instanceof AppError))
                throw new Error('Error: ' + e)

        }
    }
}