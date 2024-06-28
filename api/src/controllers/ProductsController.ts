import { Request, Response } from "express";
import { ProductsCreateService } from "../services/ProductsCreateService";
import { ProductsSearchService } from "../services/ProductsSearchService";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ProductsDeleteService } from "../services/ProductsDeleteService";
import { IngredientData } from "../interfaces/ingredientData";

interface ProductSearchData {
  id?: string;
  name?: string;
  ingredients?: IngredientData[];
}

interface ProductRequest extends Request {
  file?: Express.Multer.File;
}
export class ProductsController {
  async create(request: ProductRequest, response: Response) {
    console.log("Request.body ProductsController: ", request.body);
    console.log("Request.file ProductsController: ", request?.file);
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
    const product = await productsSearchService.execute({ id });
    return response.status(201).json(product);
  }

  async index(request: Request, response: Response) {
    const { input } = request.query;
    const productsRepository = new ProductsRepository();
    const productsSearchService = new ProductsSearchService(productsRepository);
    let searchTerm;
    if (typeof input === "string") {
      searchTerm = input;
    }
    const products = await productsSearchService.execute({ input: searchTerm });
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
