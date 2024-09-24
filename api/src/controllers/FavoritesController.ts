import { Request, Response } from "express";
import { FavoritesRepository } from "../repositories/FavoritesRepository";
import { FavoritesCreateService } from "../services/FavoritesCreateService";
import { FavoritesSearchService } from "../services/FavoritesSearchService";
import { FavoritesDeleteService } from "../services/FavoritesDeleteService";

interface ExtendedRequest extends Request {
  user?: {
    role: string;
    id: string;
  };
}

export class FavoritesController {
  async create(request: ExtendedRequest, response: Response) {
    const { productId } = request.body;
    const { user } = request;
    if (!user) return response.status(401).json({ error: "Unauthorized" });
    const favoritesRepository = new FavoritesRepository();
    const favoritesCreateService = new FavoritesCreateService(
      favoritesRepository
    );
    const newFavorite = await favoritesCreateService.execute({
      userId: user.id,
      productId,
    });
    return response.status(201).json(newFavorite);
  }
  async index(request: ExtendedRequest, response: Response) {
    const { user } = request;
    if (!user) return response.status(401).json({ error: "Unauthorized" }); // unauthorized de nao autenticado diferente de 403
    const favoritesRepository = new FavoritesRepository();
    const favoritesSearchService = new FavoritesSearchService(
      favoritesRepository
    );
    const favorites = await favoritesSearchService.execute(user.id);
    return response.status(200).json(favorites);
  }

  async delete(request: ExtendedRequest, response: Response) {
    const { favoriteId } = request.body;
    const { user } = request;
    if (!user) return response.status(401).json({ error: "Unauthorized" });
    const favoritesRepository = new FavoritesRepository();
    const favoritesDeleteService = new FavoritesDeleteService(
      favoritesRepository
    );
    await favoritesDeleteService.execute(favoriteId);
    return response.status(200).json();
  }
}
