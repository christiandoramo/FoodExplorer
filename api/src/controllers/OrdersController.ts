import { Request, Response } from "express";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { ItemsProductsRepository } from "../repositories/ItemsProductsRepository";
import { OrdersCreateService } from "../services/OrdersCreateService";
import { OrdersAdminListService } from "../services/OrdersAdminListService";
import { OrdersCustomerListService } from "../services/OrdersCustomerListService";
import { OrdersFindOneService } from "../services/OrdersFindOneService";
import { USER_ROLES } from "../enums/users";

interface ExtendedRequest extends Request {
  user?: {
    role: string;
    id: string;
  };
}

interface ExtendedRequest extends Request {
  user?: {
    role: string;
    id: string;
  };
}

export class OrdersController {
  async create(request: Request, response: Response) {
    const { user_id, itemsProducts, method } = request.body;
    const parsedItemsProducts = JSON.parse(itemsProducts);

    const ordersRepository = new OrdersRepository();
    const itemsProductsRepository = new ItemsProductsRepository();
    const ordersCreateService = new OrdersCreateService(
      ordersRepository,
      itemsProductsRepository
    );

    const newOrder = await ordersCreateService.execute({
      user_id,
      itemsProducts: parsedItemsProducts,
      method,
    });
    return response.status(201).json(newOrder);
  }
  async show(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    const ordersRepository = new OrdersRepository();
    const ordersFindOneService = new OrdersFindOneService(ordersRepository);
    const order = await ordersFindOneService.execute(id);
    if (
      request?.user?.id !== order.user_id &&
      request?.user?.role !== USER_ROLES.ADMIN
    )
      return response.status(403).json("Usuário não autorizado");
    return response.status(201).json(order);
  }

  async indexAdmin(request: Request, response: Response) {
    const ordersRepository = new OrdersRepository();
    const ordersAdminListService = new OrdersAdminListService(ordersRepository);
    const orders = await ordersAdminListService.execute();
    return response.status(201).json(orders);
  }
  async indexCustomer(request: ExtendedRequest, response: Response) {
    const ordersRepository = new OrdersRepository();
    const ordersCustomerListService = new OrdersCustomerListService(
      ordersRepository
    );
    const orders = await ordersCustomerListService.execute(
      request?.user?.id as string
    );
    if (!orders || orders?.length === 0) {
      return response.status(404).json("Nenhum pedido encontrado");
    }
    if (
      request?.user?.id !== orders[0].user_id &&
      request?.user?.role !== USER_ROLES.ADMIN
    )
      return response.status(403).json("Não autorizado");
    return response.status(201).json(orders);
  }
}
