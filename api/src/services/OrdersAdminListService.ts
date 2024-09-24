import AppError from "../utils/AppError";
import { OrdersRepository } from "../repositories/OrdersRepository";

export class OrdersAdminListService {
  ordersRepository;
  constructor(ordersRepository: OrdersRepository) {
    this.ordersRepository = ordersRepository;
  }
  async execute() {
    try {
      return await this.ordersRepository.findAllOrders(); // todas as orders
    } catch (e: any) {
      if (!(e instanceof AppError)) throw new Error("Error: " + e);
    }
  }
}
