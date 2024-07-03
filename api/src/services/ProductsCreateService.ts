import { ProductsRepository } from "../repositories/ProductsRepository";
import AppError from "../utils/AppError";
import DiskStorage from "../providers/DiskStorage";
import { PRODUCT_CATEGORY } from "../enums/category";
import { IngredientData } from "../interfaces/ingredientData";
import { z } from "zod";

interface ProductCreateData {
  name: string;
  category: PRODUCT_CATEGORY;
  description: string;
  price: number;
  file?: Express.Multer.File;
  ingredients: IngredientData[];
}

const ingredientSchema = z.object({
  name: z.string().min(1, "O nome do ingrediente é obrigatório"),
  amount: z.number().optional(),
});

const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const productCreateSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  category: z.nativeEnum(PRODUCT_CATEGORY),
  description: z.string().min(1, "Insira alguma descrição"),
  price: z.number().positive("O preço deve ser um número positivo"),
  file: z.object({
    size: z.number().max(MAX_FILE_SIZE, `Tamanho máximo do arquivo é 5MB.`),
    mimetype: z.string().refine((type) => ACCEPTED_IMAGE_TYPES.includes(type), {
      message: "Formato de arquivo inválido.",
    }),
  }),
  ingredients: z
    .array(ingredientSchema)
    .min(1, "Descreva o ingrediente")
    .optional(),
});

export class ProductsCreateService {
  productsRepository;
  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }
  async execute({
    name,
    description,
    category,
    price,
    file,
    ingredients,
  }: ProductCreateData) {
    try {
      productCreateSchema.safeParse({
        name,
        description,
        category,
        price,
        file,
        ingredients,
      });

      const filename = file?.filename || "";
      const diskStorage = new DiskStorage();
      const avatar = await diskStorage.saveFile(filename);
      const newProductId = await this.productsRepository.create({
        name,
        description,
        category,
        price,
        avatar,
        ingredients,
      });
      const newProduct = await this.productsRepository.findById(newProductId);
      return newProduct;
    } catch (error: any) {
      if (error.errors?.length > 0)
        console.error(error.errors.map((err: any) => err.message).join(", "));
      else console.error(error);
      throw new AppError("Insira dados válidos para registrar o produto", 400);
    }
  }
}
