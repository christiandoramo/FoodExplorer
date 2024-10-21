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

interface UpdateProductData {
  id: string;
  name?: string;
  category?: PRODUCT_CATEGORY;
  description?: string;
  price?: number;
  avatar?: string;
  ingredients?: IngredientData[];
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
    if (ingredients.length > 0) {
      console.log(result);
      console.log(ingredients);
      ingredients.forEach(async (ingredient) => {
        await db("ingredients").insert({
          name: ingredient,
          product_id: result.id,
        });
      });
    }
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
      if (slug === "" || !slug) {
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
        if (!ingredientsByName?.length && !productsByName?.length) {
          console.log("entrou aki");
          return [];
        }
        //inicia com os ids de cada product achado pelo name em productIds
        const productIds = new Set(productsByName.map((product) => product.id));

        // coloca os product_id de cada ingredient achado pelo name no productIds
        ingredientsByName.forEach((ingredient) => {
          productIds.add(ingredient.product_id);
        });

        // Buscar todos os produtos e ingredientes associados aos IDs encontrados
        products = await db("products")
          .whereIn("id", Array.from(productIds))
          .orderBy("price", "asc")
          .limit(limit)
          .offset(offset);

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
      const categories = await db("products").distinct("category");

      const categorizedProducts: Record<string, any[]> = {};

      for (const categoryObj of categories) {
        const categoryName = categoryObj.category;

        const products = await db("products")
          .where("category", categoryName)
          .orderBy("price", "asc")
          .limit(limit)
          .offset(offset);

        if (products.length === 0) {
          continue;
        }
        const productIds = products.map((product) => product.id);
        const allIngredients = await db("ingredients").whereIn(
          "product_id",
          productIds
        );

        const productsWithIngredients = products.map((product) => {
          const ingredients =
            allIngredients?.length > 0
              ? allIngredients.filter(
                  (ingredient) => ingredient.product_id === product.id
                )
              : [];
          return { ...product, ingredients };
        });

        // Garantir que mesmo se houver 1 produto, ele seja colocado em um array
        categorizedProducts[categoryName] = productsWithIngredients;
      }

      return Object.values(categorizedProducts);
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

  async findAllCategories() {
    const categories = Object.values(PRODUCT_CATEGORY);
    return categories;
  }

  async update({
    id,
    name,
    description,
    category,
    price,
    avatar,
    ingredients,
  }: UpdateProductData) {
    const [result] = await db("products")
      .where({ id })
      .update({
        name,
        description,
        category,
        price,
        avatar,
      })
      .returning("id");

    if (!!ingredients?.length) {
      const foundIngredients = await db("ingredients").where({
        product_id: id,
      });
      if (ingredients?.length > 0)
        ingredients.forEach(async (ingredient) => {
          if (!ingredient?.id) {
            // insere novos ingredientes no banco
            await db("ingredients").insert({
              name: ingredient.name,
              product_id: result.id,
            });
          }
        });
      // após isso os ingredientes não presentes para o produto devem ser apagados do banco
      if (foundIngredients?.length) {
        let toDeleteIngredients = foundIngredients;
        for (const ingredient of ingredients) {
          if (foundIngredients.some((ing) => ing?.id === ingredient?.id)) {
            toDeleteIngredients = toDeleteIngredients.filter(
              (ing) => ing.id !== ingredient.id
            ); // só sobra os não presentes dos achados no banco
            // logo resta deletar
          }
        }
        await db("ingredients")
          .whereIn(
            "id",
            toDeleteIngredients.map((ing) => ing.id)
          )
          .delete();
      }
    } else {
      const foundIngredients = await db("ingredients").where({
        product_id: id,
      });
      await db("ingredients")
        .whereIn(
          "id",
          foundIngredients.map((ing) => ing.id)
        )
        .delete();
    }
    return result.id;
  }

  async findCategorizedProductsByNameAndIngredients({
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

      // Se não houver slug, retorne um array vazio
      if (!slug) {
        return [];
      }

      const searchTerms = slug
        .trim()
        .split(" ")
        .filter((term) => term !== "");

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

      // Se nenhum produto ou ingrediente for encontrado, retorne um array vazio
      if (!productsByName?.length && !ingredientsByName?.length) {
        return [];
      }

      // Obter IDs dos produtos encontrados diretamente e via ingredientes
      const productIds = new Set(productsByName.map((product) => product.id));
      ingredientsByName.forEach((ingredient) => {
        productIds.add(ingredient.product_id);
      });

      // Buscar todos os produtos e ingredientes associados aos IDs encontrados
      const products = await db("products")
        .whereIn("id", Array.from(productIds))
        .orderBy("price", "asc")
        .limit(limit)
        .offset(offset);

      const allIngredients = await db("ingredients").whereIn(
        "product_id",
        Array.from(productIds)
      );

      // Categorizar os produtos
      const categorizedProducts: Record<string, any[]> = {};

      for (const product of products) {
        const categoryName = product.category;

        const productIngredients = allIngredients.filter(
          (ingredient) => ingredient.product_id === product.id
        );

        const productWithIngredients = {
          ...product,
          ingredients: productIngredients,
        };

        // Agrupar produtos por categoria
        if (!categorizedProducts[categoryName]) {
          categorizedProducts[categoryName] = [];
        }
        categorizedProducts[categoryName].push(productWithIngredients);
      }

      // Retornar os produtos categorizados
      return Object.values(categorizedProducts);
    } catch (error) {
      console.error("Erro ao buscar produtos categorizados:", error);
      throw error;
    }
  }
}
