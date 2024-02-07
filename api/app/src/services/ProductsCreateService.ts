import { ProductsRepository } from "../repositories/ProductsRepository"
import AppError from "../utils/AppError"
import DiskStorage from "../providers/DiskStorage"

interface ProductCreateData {
    name: string;
    category: string;
    description: string;
    price: number;
    file: File;
    ingredients: IngredientData[];
}
interface IngredientData {
    name: string;
}

export class ProductsCreateService {
    productsRepository
    constructor(productsRepository: ProductsRepository) {
        this.productsRepository = productsRepository
    }
    async execute({ name, description, category, price, file, ingredients }: ProductCreateData) {
        if (!(name && description && category && price && file && ingredients)) throw new AppError('Invalid params', 400)
        const filename = file.name
        const diskStorage = new DiskStorage()
        const avatar = await diskStorage.saveFile(filename)
        const newProductId = await this.productsRepository.create({ name, description, category, price, avatar,ingredients });
        const newProduct = await this.productsRepository.findById(newProductId);
        return newProduct
    }
}