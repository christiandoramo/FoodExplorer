import { Request, Response } from "express";
import { ProductsCreateService } from "../services/ProductsCreateService";
import { ProductsSearchService } from "../services/ProductsSearchService";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ProductsDeleteService } from "../services/ProductsDeleteService";
import { ProductsCategoriesSearchService } from "../services/ProductsCategoriesSearch";

interface ProductRequest extends Request {
  file?: Express.Multer.File;
}
export class ProductsController {
  async create(request: ProductRequest, response: Response) {
    const { name, description, category, price, ingredients } = request.body;
    const file = request?.file;
    const parsedIngredients = JSON.parse(ingredients) || [];

    const productsRepository = new ProductsRepository();
    const productsCreateService = new ProductsCreateService(productsRepository);

    const newProduct = await productsCreateService.execute({
      name,
      description,
      category,
      price,
      file,
      ingredients: parsedIngredients,
    });
    return response.status(201).json(newProduct);
  }
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const productsRepository = new ProductsRepository();
    const productsSearchService = new ProductsSearchService(productsRepository);
    const product = await productsSearchService.findById(id);
    return response.status(201).json(product);
  }

  async search(request: Request, response: Response) {
    // search tras todos os dados, ou por slug, ou por category
    const { slug, limit, offset, category } = request.query;
    const productsRepository = new ProductsRepository();
    const productsSearchService = new ProductsSearchService(productsRepository);
    if (!!slug) {
      const productsBySlug = await productsSearchService.findBySlug({
        slug: (slug as string) || undefined,
        limit: Number(limit) || undefined,
        offset: Number(offset) || undefined,
      });
      return response.status(201).json(productsBySlug);
    } else if (!!category) {
      const productsByCategory =
        await productsSearchService.findProductsByCategory({
          category: (category as string) || undefined,
          limit: Number(limit) || undefined,
          offset: Number(offset) || undefined,
        });
      return response.status(201).json(productsByCategory);
    }
    // trás todos se não tiver nenhuma query como slug ou category
    const products = await productsSearchService.findCategorized({
      limit: Number(limit),
      offset: Number(offset),
    });
    return response.status(201).json(products);
  }

  async index(request: Request, response: Response) {
    // index traz dados por categoria
    const { limit, offset } = request.query;
    const productsRepository = new ProductsRepository();
    const productsSearchService = new ProductsSearchService(productsRepository);
    const categorizedProducts = await productsSearchService.findCategorized({
      limit: Number(limit),
      offset: Number(offset),
    });
    return response.status(201).json(categorizedProducts);
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const productsRepository = new ProductsRepository();
    const productsDeleteService = new ProductsDeleteService(productsRepository);
    await productsDeleteService.execute(id);
    return response.status(200).json("Produto deletado com sucesso");
  }
  async findAllCategories(req: Request, res: Response) {
    const productsRepository = new ProductsRepository();
    const productsCategoriesSearch = new ProductsCategoriesSearchService(
      productsRepository
    );
    const categories = await productsCategoriesSearch.execute();
    return res.status(200).json(categories);
  }
}
