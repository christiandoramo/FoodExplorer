import { CartsRepository } from "../repositories/CartsRepository"
import AppError from "../utils/AppError"
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ProductsSearchService } from "./ProductsSearchService";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { CartsSearchService } from "./CartsSearchService";

interface IngredientData {
    name: string;
}

export class AdminOrdersSearchService {
    ordersRepository
    constructor(ordersRepository: OrdersRepository) {
        this.ordersRepository = ordersRepository
    }
    async execute() {
        try {
            const orders = await this.ordersRepository.findAll() // todas as orders
            const cartsRepository = new CartsRepository() //
            return orders.map(async (order) => {
                const { cart, items } = await cartsRepository.findCartById(order.cart_id);
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
                        return { order,cart, itemsWithProducts }
                    }else{
                        throw new AppError("Items not found", 404)
                    }
                } else {
                    throw new AppError("Cart not found", 404)
                }

            })
        } catch (e: any) {
            if (!(e instanceof AppError))
                throw new Error('Error: ' + e)

        }
    }
}