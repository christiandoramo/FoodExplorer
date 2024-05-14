import { ProductsRepository } from "../repositories/ProductsRepository";
import AppError from "../utils/AppError";
import DiskStorage from "../providers/DiskStorage";

export class ProductsDeleteService {
  productsRepository;
  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }
  async execute(id: string) {
    if (!id) throw new AppError("Invalid params", 400);

    const productWithIngredients = await this.productsRepository.findById(id);
    if (productWithIngredients) {
      await this.productsRepository.deleteProduct(productWithIngredients.id);
      return;
    } else {
      throw new AppError("Produto não achado", 404);
    }
  }
}
