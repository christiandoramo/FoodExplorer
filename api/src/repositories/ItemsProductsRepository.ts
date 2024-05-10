import { db } from "../database";

export class ItemsProductsRepository {
  async create({
    product_id,
    user_id,
    quantity,
  }: {
    product_id: string;
    user_id: string;
    quantity: number;
  }) {
    const carts = await db("carts").where({ user_id });
    const cart = carts[carts.length - 1]; // garantindo que vai pegar o Cart mais atual do usuario
    const product = await db("products").where({ id: product_id }).first();
    const amount = quantity * product.price;
    const [result] = await db("items_products")
      .insert({ product_id, cart_id: cart.id, amount, quantity })
      .returning("id");
  }

  async delete(id: string) {
    return await db("item_products").where({ id }).delete();
  }
}
