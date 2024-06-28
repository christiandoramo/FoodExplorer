import { db } from "../database";
import { PRODUCT_CATEGORY } from "../enums/category";
import { IngredientData } from "../interfaces/ingredientData";

interface ProductData {
  id?: string;
  name: string;
  category: PRODUCT_CATEGORY;
  description: string;
  price: number;
  avatar: string;
  ingredients: IngredientData[];
}

export class ProductsRepository {
  async create({
    name,
    description,
    category,
    price,
    avatar,
    ingredients,
  }: ProductData) {
    const [result] = await db("products")
      .insert({ name, description, category, price, avatar })
      .returning("id");
    ingredients.forEach(async (ingredient) => {
      await db("ingredients").insert({
        name: ingredient.name,
        product_id: result.id,
      });
    });
    return result.id;
  }
  async findProductsByNameOrIngredients(input: string) {
    if (input) {
      const ingredients = input
        .split(" ")
        .map((ingredient) => ingredient.replace(",", "").trim());
      if (ingredients.length < 1) {
        const products = await db("ingredients")
          .select(["products.*"])
          .whereLike("products.name", `%${input}%`)
          .innerJoin("products", "products.id", "ingredients.product_id")
          .orderBy("products.price");

        const allIngredients = await db("ingredients");
        const productsWithIngredients = products.map((product) => {
          const productsIngredients = allIngredients.filter(
            (ingredient) => ingredient.product_id === product.id
          );
          const productWithIngredients = {
            ...product,
            ingredients: productsIngredients,
          };
          return productWithIngredients;
        });
        return productsWithIngredients;
      }
      const products = await db("ingredients")
        .select(["products.*"])
        .whereLike("products.name", `%${input}%`)
        .whereIn("name", ingredients)
        .innerJoin("products", "products.id", "ingredients.product_id")
        .orderBy("products.price");

      const allIngredients = await db("ingredients");
      const productsWithIngredients = products.map((product) => {
        const productsIngredients = allIngredients.filter(
          (ingredient) => ingredient.product_id === product.id
        );
        const productWithIngredients = {
          ...product,
          ingredients: productsIngredients,
        };
        return productWithIngredients;
      });
      return productsWithIngredients;
    } else {
      const allProducts = await db("products");
      const allIngredients = await db("ingredients");
      const productsWithIngredients = allProducts.map((product) => {
        const productsIngredients = allIngredients.filter(
          (ingredient) => ingredient.product_id === product.id
        );
        const productWithIngredients = {
          ...product,
          ingredients: productsIngredients,
        };
        return productWithIngredients;
      });
      return productsWithIngredients;
    }
  }
  async findAllProducts() {
    const products = await db("products");
    const productsWithIngredients = products.map(async (product) => {
      const ingredients = await db("ingredients").where({
        product_id: product.id,
      });
      return { ...product, ingredients };
    });
    return productsWithIngredients;
  }

  async findById(id: string) {
    const product = await db("products").where({ id }).first();
    const ingredients = await db("ingredients").where({ product_id: id });
    return { ...product, ingredients };
  }

  async deleteProduct(id: string) {
    await db("item_products").where({ product_id: id }).delete();
    await db("ingredients").where({ product_id: id }).delete();
    return await db("products").where({ id }).delete();
  }
}
