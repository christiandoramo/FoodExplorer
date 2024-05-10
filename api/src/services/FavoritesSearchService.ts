import { FavoritesRepository } from "../repositories/FavoritesRepository";
import AppError from "../utils/AppError"

export class FavoritesSearchService {
    favoritesRepository
    constructor(favoritesRepository: FavoritesRepository) {
        this.favoritesRepository = favoritesRepository
    }
    async execute(userId: string) {
        const favorites = await this.favoritesRepository.findAll(userId);
        if (favorites.length === 0) {
            throw new AppError("Favorites not found", 404)
        }
        return favorites
    }
}