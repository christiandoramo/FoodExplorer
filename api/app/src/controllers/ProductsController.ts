import { Request, Response } from 'express'
import { ProductsCreateService } from '../services/ProductsCreateService'
import { ProductsSearchService } from '../services/ProductsSearchService'
import { ProductsRepository } from '../repositories/ProductsRepository'


interface IngredientData {
    name: string;
}

interface ProductSearchData {
    id?: string;
    name?: string;
    ingredients?: IngredientData[];
}

export class ProductsController {
    async create(request: Request, response: Response) {
        const { name, description, category, price, file, ingredients } = request.body
        const productsRepository = new ProductsRepository()
        const productsCreateService = new ProductsCreateService(productsRepository);
        const newProduct = await productsCreateService.execute({ name, description, category, price, file, ingredients })
        return response.status(201).json(newProduct)
    }
    async show(request: Request, response: Response) {
        const { id } = request.params
        const productsRepository = new ProductsRepository()
        const productsSearchService = new ProductsSearchService(productsRepository);
        const product = await productsSearchService.execute({ id })
        return response.status(201).json(product)
    }

    async index(request: Request, response: Response) {
        const { input } = request.query
        const productsRepository = new ProductsRepository()
        const productsSearchService = new ProductsSearchService(productsRepository);
        let searchTerm;
        if (typeof input === 'string') {
            searchTerm = input
        }
        const products = await productsSearchService.execute({ input: searchTerm })
        return response.status(201).json(products)
    }
}