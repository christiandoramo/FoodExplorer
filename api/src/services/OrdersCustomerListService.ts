import AppError from "../utils/AppError";
import { OrdersRepository } from "../repositories/OrdersRepository";

export class OrdersAdminListService {
  ordersRepository;
  constructor(ordersRepository: OrdersRepository) {
    this.ordersRepository = ordersRepository;
  }
  async execute(userId: string) {
    try {
      return await this.ordersRepository.findAllOrdersByUserId(userId); // todas as orders
    } catch (e: any) {
      if (!(e instanceof AppError)) throw new Error("Error: " + e);
    }
  }
}
