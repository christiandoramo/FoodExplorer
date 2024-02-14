import { CartsRepository } from "../repositories/CartsRepository"
import AppError from "../utils/AppError"
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ProductsSearchService } from "./ProductsSearchService";
import { OrdersRepository } from "../repositories/OrdersRepository";

export class OrdersSearchService {
    ordersRepository
    constructor(ordersRepository: OrdersRepository) {
        this.ordersRepository = ordersRepository
    }
    async execute(orderId: string) {
        try {
            const order = await this.ordersRepository.findById(orderId) // orders do usuario
            const cartsRepository = new CartsRepository() //
            const orderWithDetails = async () => {
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
                        return { order, cart, itemsWithProducts }
                    } else {
                        throw new AppError("Items not found", 404)
                    }
                } else {
                    throw new AppError("Cart not found", 404)
                }
            }
            return await orderWithDetails()
        } catch (e: any) {
            if (!(e instanceof AppError))
                throw new Error('Error: ' + e)

        }
    }
}