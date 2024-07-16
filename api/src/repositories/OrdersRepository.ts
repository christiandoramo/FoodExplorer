/// copiado de Cart foi convertido em Order

import { db } from "../database";
import { PAYMENT_METHOD } from "../enums/method";
import { ORDER_STATUS } from "../enums/orders";
import { OrderCreateSchema } from "../interfaces/order";
import { ItemsProductsRepository } from "./ItemsProductsRepository";

export class OrdersRepository {
  async create(orderCreateSchema: OrderCreateSchema) {
    const { amount, itemsProducts, method, user_id } = orderCreateSchema;
    const trx = await db.transaction();
    try {
      const [result] = await trx("orders")
        .insert({ amount, method, user_id })
        .returning("id");
      const order_id: string = result.id;
      const itemsProductsRepository = new ItemsProductsRepository();
      const itemsProductsCreateBodySchema = [];
      for (const item of itemsProducts) {
        itemsProductsCreateBodySchema.push({ order_id, ...item });
      }
      await itemsProductsRepository.create(itemsProductsCreateBodySchema);
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async findAllOrdersByUserId(id: string) {
    const orders = await db("orders").where({ user_id: id });
    const itemsProductRepository = new ItemsProductsRepository();
    const ordersWithItemProducts = [];
    for (const order of orders) {
      const itemsProducts =
        await itemsProductRepository.findItemsProductsByOrderId(order.id);
      ordersWithItemProducts.push(...order, itemsProducts);
    }
    return ordersWithItemProducts;
  }

  async findAllOrders() {
    const orders = await db("orders");
    const itemsProductRepository = new ItemsProductsRepository();
    const ordersWithItemProducts = [];
    for (const order of orders) {
      const itemsProducts =
        await itemsProductRepository.findItemsProductsByOrderId(order.id);
      ordersWithItemProducts.push(...order, itemsProducts);
    }
    return ordersWithItemProducts;
  }

  async findOrderById(id: string) {
    const order = await db("orders").where({ id });
    const items = await db("items_products").where({ order_id: id });
    const orderWithItems = { order, items };
    return orderWithItems;
  }
  async findLastOrderByUserId(userId: string) {
    const lastOrder = await db("orders")
      .where({ user_id: userId })
      .orderBy("created_at", "desc")
      .first();
    if (!!lastOrder) {
      const items = await db("items_products").where({
        order_id: lastOrder.id,
      });
      const orderWithItems = { order: lastOrder, items };
      return orderWithItems;
    }
    return;
  }

  async deleteOrderById(id: string) {
    const trx = await db.transaction();
    try {
      await trx("items_products").where({ order_id: id }).delete();
      return await trx("orders").where({ id }).delete();
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
  // async cancelOrderByUser(userId: string, orderId: string) {
  //   const order = await db("orders").where({ orderId: orderId }).first();
  //   if (order.user_id !== userId) {
  //     return;
  //   }
  //   return await db("orders")
  //     .where({ orderId: orderId })
  //     .first()
  //     .update({ status: ORDER_STATUS.CANCELED });
  // }
  // async cancelOrderByAdmin(role: USER_ROLES, orderId: string) {
  //   if (role !== USER_ROLES.ADMIN) {
  //     return;
  //   }
  //   return await db("orders")
  //     .where({ orderId: orderId })
  //     .first()
  //     .update({ status: ORDER_STATUS.CANCELED });
  // }
  async updatePreparingOrder(orderId: string) {
    return await db("orders")
      .where({ orderId: orderId })
      .first()
      .update({ status: ORDER_STATUS.PREPARING });
  }

  async updateDeliveredOrder(orderId: string) {
    return await db("orders")
      .where({ orderId: orderId })
      .first()
      .update({ status: ORDER_STATUS.DELIVERED });
  }
}
