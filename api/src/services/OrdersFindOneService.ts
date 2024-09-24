import AppError from "../utils/AppError";
import { OrdersRepository } from "../repositories/OrdersRepository";

export class OrdersFindOneService {
  ordersRepository;
  constructor(ordersRepository: OrdersRepository) {
    this.ordersRepository = ordersRepository;
  }
  async execute(orderId: string) {
    try {
      return await this.ordersRepository.findOrderById(orderId); // todas as orders
    } catch (e: any) {
      if (!(e instanceof AppError)) throw new Error("Error: " + e);
    }
  }
}
