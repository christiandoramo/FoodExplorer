import { ProductsRepository } from "../repositories/ProductsRepository";
import AppError from "../utils/AppError";
import DiskStorage from "../providers/DiskStorage";

export class ProductsCategoriesSearch {
  productsRepository;
  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }
  execute() {
    this.productsRepository.findAllCategories();
  }
}
