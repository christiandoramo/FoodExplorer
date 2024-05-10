import { ProductsRepository } from "../repositories/ProductsRepository"
import AppError from "../utils/AppError"

interface ProductSearchData {
    id?: string;
    input?: string;
}


export class ProductsSearchService {
    productsRepository
    constructor(productsRepository: ProductsRepository) {
        this.productsRepository = productsRepository
    }
    async execute({ id, input }: ProductSearchData) {
        if (!(input || id)) throw new AppError('Invalid params', 400)
        if (id) {
            const product = await this.productsRepository.findById(id)
            return product
        }
        else if (input) {
            const products = await this.productsRepository.findProductsByNameOrIngredients(input);
            return products;
        }
    }
}