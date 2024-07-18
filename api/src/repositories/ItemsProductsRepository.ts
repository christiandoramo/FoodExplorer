import { db } from "../database";
import { ItemProductCreateBodySchema } from "../interfaces/itemProduct";
import AppError from "../utils/AppError";
import { ProductsRepository } from "./ProductsRepository";

export class ItemsProductsRepository {
  async create(itemProductCreateBodySchema: ItemProductCreateBodySchema[]) {
    let orderAmount = 0;
    if (itemProductCreateBodySchema.length > 1) {
      const productsRepository = new ProductsRepository();
      const trx = await db.transaction();
      const insertedIds = [];
      try {
        for (const itemProduct of itemProductCreateBodySchema) {
          const { product_id, order_id, quantity } = itemProduct;
          const productWithItem = await productsRepository.findById(product_id);
          if (!productWithItem) {
            throw new AppError(
              `Produto com o id ${product_id} naõ encontrado`,
              400
            );
          }
          const amount = quantity * productWithItem.price;
          orderAmount += amount;
          const [result] = await trx("items_products")
            .insert({ product_id, order_id, amount, quantity })
            .returning("id");
          insertedIds.push(result.id);
        }
        await trx.commit();
        return { insertedIds: insertedIds, orderAmount: orderAmount };
      } catch (error) {
        // Em caso de erro, fazer rollback da transação
        await trx.rollback();
        throw error;
      }
    } else if (itemProductCreateBodySchema.length === 1) {
      const { product_id, order_id, quantity } = itemProductCreateBodySchema[0];
      const productsRepository = new ProductsRepository();
      const productWithItem = await productsRepository.findById(product_id);
      if (!productWithItem) return;
      const amount = quantity * productWithItem.price;
      orderAmount += amount;
      const [result] = await db("items_products")
        .insert({ product_id, order_id, amount, quantity })
        .returning("id");
      return { insertedIds: result.id, orderAmount: orderAmount };
    }
  }

  async findItemsProductsByOrderId(orderId: string) {
    const itemsProducts = await db("items_products").where({
      order_id: orderId,
    });
    const productsRepository = new ProductsRepository();
    if (itemsProducts.length > 1) {
      const itemsProductsWithProductAndIngredients = [];
      for (const itemProduct of itemsProducts) {
        const { product_id } = itemProduct;
        const productWithIngredients = await productsRepository.findById(
          product_id
        );
        itemsProductsWithProductAndIngredients.push({
          ...itemProduct,
          product: productWithIngredients,
        });
      }
      return itemsProductsWithProductAndIngredients;
    } else if (itemsProducts.length === 1) {
      const { product_id } = itemsProducts[0];
      const productWithIngredients = await productsRepository.findById(
        product_id
      );
      return {
        ...itemsProducts[0],
        product: productWithIngredients,
      };
    }
  }

  async delete(id: string) {
    return await db("item_products").where({ id }).delete();
  }
}
