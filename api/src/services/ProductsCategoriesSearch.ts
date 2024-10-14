import { ProductsRepository } from "../repositories/ProductsRepository";
import AppError from "../utils/AppError";
import DiskStorage from "../providers/DiskStorage";

export class ProductsCategoriesSearchService {
  productsRepository;
  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }
  async execute() {
    return await this.productsRepository.findAllCategories();
  }
}
