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
  async findProductsByNameAndIngredients({
    slug,
    offset,
    limit,
  }: {
    slug?: string;
    offset?: number;
    limit?: number;
  }) {
    try {
      slug = !slug ? "" : slug;
      limit = limit && limit > 0 && limit <= 100 ? limit : 10;
      offset = offset && offset >= 0 ? offset : 0;
      if (slug === "" || !!slug) {
        const allProducts = await db("products")
          .orderBy("price", "asc")
          .limit(limit)
          .offset(offset);
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
      } else {
        const searchTerms = slug
          .trim()
          .split(" ")
          .filter((term) => term !== "");

        let products: any;
        let allIngredients: any;

        // Buscar produtos cujos nomes correspondem aos termos de busca
        const productsByName = await db("products")
          .select("*")
          .where(function () {
            searchTerms.forEach((term) => {
              this.orWhereILike("name", `%${term}%`);
            });
          });
        // Buscar ingredientes cujos nomes correspondem aos termos de busca
        const ingredientsByName = await db("ingredients")
          .select("*")
          .where(function () {
            searchTerms.forEach((term) => {
              this.orWhereILike("name", `%${term}%`);
            });
          });

        // retorna array vazio caso não ache nada em produtos e nem em ingredientes
        if (!ingredientsByName?.length && !productsByName.length) return [];

        // Obter os IDs únicos dos produtos encontrados

        //inicia com os ids de cada product achado pelo name em productIds
        const productIds = new Set(productsByName.map((product) => product.id));

        // coloca os product_id de cada ingredient achado pelo name no productIds
        ingredientsByName.forEach((ingredient) => {
          productIds.add(ingredient.product_id);
        });

        // Buscar todos os produtos e ingredientes associados aos IDs encontrados
        products = await db("products")
          .orderBy("price", "asc")
          .limit(limit)
          .offset(offset)
          .select("*")
          .whereIn("id", Array.from(productIds))
          .orderBy("price", "asc");

        allIngredients = await db("ingredients")
          .select("*")
          .whereIn("product_id", Array.from(productIds));

        // Associar ingredientes aos produtos
        let productsWithIngredients;

        if (products.length === 1) {
          return this.getProductWithIngredients(products[0], allIngredients);
        }
        productsWithIngredients = products.map((product: any) => {
          const productIngredients = allIngredients.filter(
            (ingredient: any) => ingredient.product_id === product.id
          );
          return {
            ...product,
            ingredients: productIngredients,
          };
        });

        return productsWithIngredients;
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  }
  async findAllProducts({
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  }) {
    limit = limit && limit > 0 && limit <= 100 ? limit : 10;
    offset = offset && offset >= 0 ? offset : 0;
    try {
      // Busca limitada e paginada dos produtos
      const products = await db("products")
        .orderBy("price", "asc")
        .limit(limit)
        .offset(offset);

      // Busca todos os ingredientes associados aos produtos
      const productIds = products.map((product) => product.id);
      const allIngredients = await db("ingredients").whereIn(
        "product_id",
        productIds
      );

      // Associa os ingredientes aos produtos
      const productsWithIngredients = products.map((product) => {
        const ingredients = allIngredients.filter(
          (ingredient) => ingredient.product_id === product.id
        );
        return { ...product, ingredients };
      });

      return productsWithIngredients;
    } catch (error) {
      console.error("Erro ao buscar produtos com paginação:", error);
      throw error;
    }
  }

  async findCategorizedProducts({
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  }) {
    // Define os limites padrão
    limit = limit && limit > 0 && limit <= 100 ? limit : 100;
    offset = offset && offset >= 0 ? offset : 0;

    try {
      // Busca todas as categorias distintas na tabela de produtos
      const categories = await db("products").distinct("category");

      // Objeto para armazenar os produtos categorizados
      const categorizedProducts: Record<string, any[]> = {};

      // Itera sobre cada categoria para buscar os produtos
      for (const categoryObj of categories) {
        const categoryName = categoryObj.category;

        // Busca limitada de produtos para cada categoria
        const products = await db("products")
          .where("category", categoryName)
          .orderBy("price", "asc")
          .limit(limit)
          .offset(offset);

        // Se não há produtos na categoria, continue para a próxima
        if (products.length === 0) {
          continue;
        } else if (products.length === 1) {
          const allIngredients = await db("ingredients").whereIn(
            "product_id",
            products[0].id
          );
          categorizedProducts[categoryName] = this.getProductWithIngredients(
            products[0],
            allIngredients
          );
          continue;
        }

        // Busca todos os ingredientes associados aos produtos desta categoria
        const productIds = products.map((product) => product.id);
        const allIngredients = await db("ingredients").whereIn(
          "product_id",
          productIds
        );
        // Associa os ingredientes aos produtos
        const productsWithIngredients = products.map((product) => {
          const ingredients = allIngredients.filter(
            (ingredient) => ingredient.product_id === product.id
          );
          return { ...product, ingredients };
        });
        categorizedProducts[categoryName] = productsWithIngredients;
      }
      return categorizedProducts;
    } catch (error) {
      console.error("Erro ao buscar produtos categorizados:", error);
      throw error;
    }
  }
  async findProductsByCategory({
    limit,
    offset,
    category,
  }: {
    limit?: number;
    offset?: number;
    category: PRODUCT_CATEGORY;
  }) {
    limit = limit && limit > 0 && limit <= 100 ? limit : 10;
    offset = offset && offset >= 0 ? offset : 0;
    try {
      const products = await db("products")
        .where("category", category)
        .orderBy("price", "asc")
        .limit(limit)
        .offset(offset);

      if (!products.length) return [];
      else if (products.length === 1) {
        const allIngredients = await db("ingredients").whereIn(
          "product_id",
          products[0].id
        );
        return this.getProductWithIngredients(products[0], allIngredients);
      }

      const productIds = products.map((product) => product.id);
      const allIngredients = await db("ingredients").whereIn(
        "product_id",
        productIds
      );

      const productsWithIngredients = products.map((product) => {
        const ingredients = allIngredients.filter(
          (ingredient) => ingredient.product_id === product.id
        );
        return {
          ...product,
          ingredients: ingredients,
        };
      });

      return productsWithIngredients;
    } catch (error) {}
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

  getProductWithIngredients(product: any, allIngredients: any[]): any {
    // Check the length of allIngredients
    const ingredients = !allIngredients.length
      ? []
      : allIngredients.length === 1
      ? allIngredients
      : allIngredients.filter(
          (ingredient: any) => ingredient.product_id === product.id
        );

    return {
      ...product,
      ingredients: ingredients,
    };
  }

  findAllCategories(): any {
    const categories = Object.values(PRODUCT_CATEGORY);
    return categories;
  }
}
