import { CartsRepository } from "../repositories/CartsRepository"
import AppError from "../utils/AppError"
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ProductsSearchService } from "./ProductsSearchService";
import { OrdersRepository } from "../repositories/OrdersRepository";

export class PaymentCreateService {
    ordersRepository
    constructor(ordersRepository: OrdersRepository) {
        this.ordersRepository = ordersRepository
    }
    async execute() {
        try {
 
        } catch (e: any) {
            if (!(e instanceof AppError))
                throw new Error('Error: ' + e)

        }
    }
}