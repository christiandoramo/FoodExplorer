import { FavoritesRepository } from "../repositories/FavoritesRepository";
import AppError from "../utils/AppError"

export class FavoritesCreateService {
    favoritesRepository
    constructor(favoritesRepository: FavoritesRepository) {
        this.favoritesRepository = favoritesRepository
    }
    async execute({ userId, productId }: { userId: string, productId: string }) {
        const favorite = await this.favoritesRepository.findByUserAndProductId({ userId, productId });
        if (favorite) {
            throw new AppError("You already have favorited", 400)
        }
        const newFavoriteId = await this.favoritesRepository.create({ userId, productId });
        const newFavorite = await this.favoritesRepository.findById(newFavoriteId);
        return newFavorite
    }
}