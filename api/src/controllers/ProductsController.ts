import { Request, Response } from "express";
import { ProductsCreateService } from "../services/ProductsCreateService";
import { ProductsSearchService } from "../services/ProductsSearchService";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ProductsDeleteService } from "../services/ProductsDeleteService";
import AppError from "../utils/AppError";
import { z } from "zod";

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
    const { slug, limit, offset } = request.query;
    const productsRepository = new ProductsRepository();
    const productsSearchService = new ProductsSearchService(productsRepository);
    const products = await productsSearchService.findBySlug({
      slug: (slug as string) || undefined,
      limit: Number(limit) || undefined,
      offset: Number(offset) || undefined,
    });
    return response.status(201).json(products);
  }

  async index(request: Request, response: Response) {
    const { limit, offset } = request?.query;
    const productsRepository = new ProductsRepository();
    const productsSearchService = new ProductsSearchService(productsRepository);
    const products = await productsSearchService.findAll({
      limit: Number(limit),
      offset: Number(offset),
    });
    return response.status(201).json(products);
  }
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const productsRepository = new ProductsRepository();
    const productsDeleteService = new ProductsDeleteService(productsRepository);
    await productsDeleteService.execute(id);
    return response.status(200).json("Produto deletado com sucesso");
  }
}
