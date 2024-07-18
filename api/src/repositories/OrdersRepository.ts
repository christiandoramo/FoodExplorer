import { db } from "../database";
import { PAYMENT_METHOD } from "../enums/method";
import { ORDER_STATUS } from "../enums/orders";
import { OrderCreateSchema } from "../interfaces/order";
import { ItemsProductsRepository } from "./ItemsProductsRepository";

export class OrdersRepository {
  async create(orderCreateSchema: OrderCreateSchema) {
    const { itemsProducts, method, user_id } = orderCreateSchema;
    const trx = await db.transaction();
    try {
      const [result] = await trx("orders")
        .insert({ method, user_id })
        .returning("id");
      const order_id: string = result.id;
      const itemsProductsRepository = new ItemsProductsRepository();
      const itemsProductsCreateBodySchema = [];
      for (const item of itemsProducts) {
        itemsProductsCreateBodySchema.push({ order_id, ...item });
      }
      const insertedIdsAndOrderAmount = await itemsProductsRepository.create(
        itemsProductsCreateBodySchema
      );
      const order = await trx("orders")
        .where({ id: order_id })
        .update({ amount: insertedIdsAndOrderAmount?.orderAmount })
        .returning("*");
      trx.commit();
      return order;
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

  // async findAllOrders() {
  //   const orders = await db("orders");
  //   const itemsProductRepository = new ItemsProductsRepository();
  //   const ordersWithItemProducts = [];
  //   for (const order of orders) {
  //     const itemsProducts =
  //       await itemsProductRepository.findItemsProductsByOrderId(order.id);
  //     ordersWithItemProducts.push(...order, itemsProducts);
  //   }
  //   return ordersWithItemProducts;
  // }

  async findAllOrders() {
    const ordersWithItemsProductsWithProductsWithIngredients = await db(
      "orders"
    )
      .leftJoin("items_products", "orders.id", "items_products.order_id")
      .leftJoin("products", "items_products.product_id", "products.id")
      .leftJoin("ingredients", "products.id", "ingredients.product_id")
      .select(
        "orders.*",
        "items_products.*",
        "products.*",
        db.raw("ARRAY_AGG(ingredients.*) AS ingredients")
      )
      .groupBy("orders.id", "items_products.id", "products.id");

    const ordersMap = new Map();
    for (const row of ordersWithItemsProductsWithProductsWithIngredients) {
      const orderId = row.id;
      if (!ordersMap.has(orderId)) {
        ordersMap.set(orderId, {
          ...row,
          items: [],
        });
      }

      const order = ordersMap.get(orderId);
      const itemProduct = {
        id: row["items_products.id"],
        order_id: row.order_id,
        product_id: row.product_id,
        amount: row["items_products.amount"],
        quantity: row["items_products.amount"],
        product: { ...row.products, ingredients: row.ingredients },
      };
      order.items.push(itemProduct);
    }

    return Array.from(ordersMap.values());
  }

  async findOrderById(id: string) {
    const orderWithItemsProducts = await db("orders")
      .leftJoin("items_products", "orders.id", "items_products.order_id")
      .leftJoin("products", "items_products.product_id", "products.id")
      .leftJoin("ingredients", "products.id", "ingredients.product_id")
      .select("orders.*", "items_products.*", "products.*", "ingredients.*")
      .where("orders.id", id)
      .groupBy(
        "orders.id",
        "items_products.id",
        "products.id",
        "ingredients.id"
      );

    if (orderWithItemsProducts.length === 0) {
      return null; // Retorna null se não encontrar o pedido
    }

    const orderData = {
      ...orderWithItemsProducts[0],
      items: [],
    };

    const itemsMap = new Map();
    orderWithItemsProducts.forEach((row) => {
      const { orders, items_products, products, ingredients } = row;

      if (!itemsMap.has(items_products.id)) {
        itemsMap.set(items_products.id, {
          id: items_products.id,
          product_id: products.id,
          product: products,
        });
      }
      if (ingredients.id) {
        const item = itemsMap.get(items_products.id);
        item.product.ingredients.push(ingredients);
      }
    });
    orderData.items = Array.from(itemsMap.values());
    return orderData;
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
