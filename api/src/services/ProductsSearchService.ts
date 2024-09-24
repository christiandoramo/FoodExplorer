import { z } from "zod";
import { ProductsRepository } from "../repositories/ProductsRepository";
import AppError from "../utils/AppError";
import { PRODUCT_CATEGORY } from "../enums/category";

export class ProductsSearchService {
  productsRepository;
  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }
  async findById(id: string) {
    const schemaUUID = z.object({ id: z.string().uuid() });
    try {
      schemaUUID.parse({ id });
      const product = await this.productsRepository.findById(id);
      return product;
    } catch (error: any) {
      console.error(error.errors.map((err: any) => err.message).join(", "));
      throw new AppError("Insira um id válido", 400);
    }
  }
  async findBySlug({
    limit,
    offset,
    slug,
  }: {
    limit?: number;
    offset?: number;
    slug?: string;
  }) {
    const schema = z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      slug: z.string().optional(),
    });

    try {
      schema.parse({ slug, offset, limit });
      const products =
        await this.productsRepository.findProductsByNameAndIngredients({
          slug: slug,
          offset: offset,
          limit: limit,
        });
      return products;
    } catch (error: any) {
      console.error(error.errors.map((err: any) => err.message).join(", "));
      throw new AppError("Insira uma entrada válida", 400);
    }
  }
  async findAll({ limit, offset }: { limit: number; offset: number }) {
    const schema = z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
    });
    try {
      schema.parse({ limit, offset });
      const allProducts = await this.productsRepository.findAllProducts({
        limit,
        offset,
      });
      return allProducts;
    } catch (error: any) {
      console.error(error.errors.map((err: any) => err.message).join(", "));
      throw new AppError("Insira uma entrada válida", 400);
    }
  }
  async findCategorized({
    limit,
    offset,
  }: {
    limit?: number;
    offset?: number;
  }) {
    const schema = z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
    });
    try {
      schema.parse({ limit, offset });
      const categorizedProducts =
        await this.productsRepository.findCategorizedProducts({
          limit,
          offset,
        });
      return categorizedProducts;
    } catch (error: any) {
      console.error(error.errors.map((err: any) => err.message).join(", "));
      throw new AppError("Insira uma entrada válida", 400);
    }
  }
  async findProductsByCategory({
    limit,
    offset,
    category,
  }: {
    limit?: number;
    offset?: number;
    category?: string;
  }) {
    const schema = z.object({
      limit: z.number().optional(),
      offset: z.number().optional(),
      category: z
        .nativeEnum(PRODUCT_CATEGORY)
        .refine((value) => Object.values(PRODUCT_CATEGORY).includes(value), {
          message: "Insira uma categoria válida",
        }),
    });
    try {
      const parsed = schema.parse({ limit, offset, category });
      const parsedCategory = parsed.category;
      const categorizedProducts =
        await this.productsRepository.findProductsByCategory({
          limit,
          offset,
          category: parsedCategory,
        });
      return categorizedProducts;
    } catch (error: any) {
      console.error(error.errors.map((err: any) => err.message).join(", "));
      throw new AppError("Parâmetros inválidos", 400);
    }
  }
}
