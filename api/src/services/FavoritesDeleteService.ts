import { FavoritesRepository } from "../repositories/FavoritesRepository";
import AppError from "../utils/AppError"

export class FavoritesDeleteService {
    favoritesRepository
    constructor(favoritesRepository: FavoritesRepository) {
        this.favoritesRepository = favoritesRepository
    }
    async execute(id: string) {
        const favorite = await this.favoritesRepository.findById(id);
        if (!favorite) {
            throw new AppError("Favorite not found", 404)
        }
        this.favoritesRepository.deleteById(favorite.id)
        return
    }
}