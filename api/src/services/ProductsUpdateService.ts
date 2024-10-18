import { ProductsRepository } from "../repositories/ProductsRepository";
import AppError from "../utils/AppError";
import DiskStorage from "../providers/DiskStorage";
import { PRODUCT_CATEGORY } from "../enums/category";
import { IngredientData } from "../interfaces/ingredientData";
import { z } from "zod";

interface ProductUpdateData {
  id: string;
  name?: string;
  category?: PRODUCT_CATEGORY;
  description?: string;
  price?: number;
  file?: Express.Multer.File;
  ingredients?: IngredientData[];
}

const ingredientSchema = z.object({
  id: z.string().min(1, "O nome do ingrediente é obrigatório").optional(),
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

const productUpdateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "O nome é obrigatório").optional(),
  category: z
    .nativeEnum(PRODUCT_CATEGORY, {
      errorMap: () => ({ message: "Categoria inválida" }),
    })
    .optional(),
  description: z.string().min(1, "Insira alguma descrição").optional(),
  price: z.number().positive("O preço deve ser um número positivo").optional(),
  file: z
    .custom<File | undefined>(
      (value) => {
        if (value === undefined) return true;
        if (value instanceof File) return true;
        //  if (value instanceof FileList) return true;
        return false; // Inválido em outros casos
      },
      {
        message: "O arquivo precisa ser uma imagem válida.",
      }
    )
    .optional() // Arquivo opcional
    .refine(
      (file) => {
        const validFile = file;
        return !validFile || validFile.size <= MAX_FILE_SIZE;
      },
      {
        message: "Tamanho máximo da imagem deve ser 5MB",
      }
    )
    .refine(
      (file) => {
        const validFile = file;
        return !validFile || ACCEPTED_IMAGE_TYPES.includes(validFile?.type);
      },
      {
        message: "Formatos aceitos: .jpg, .webp, .jpeg e .png.",
      }
    ),
  ingredients: z
    .array(ingredientSchema)
    .min(1, "Descreva o ingrediente")
    .optional(),
});

export class ProductsUpdateService {
  productsRepository;
  constructor(productsRepository: ProductsRepository) {
    this.productsRepository = productsRepository;
  }
  async execute({
    id,
    name,
    description,
    category,
    price,
    file,
    ingredients,
  }: ProductUpdateData) {
    try {
      productUpdateSchema.safeParse({
        id,
        name,
        description,
        category,
        price,
        file,
        ingredients,
      });

      console.log("passou");
      const foundProduct = await this.productsRepository.findById(id);
      if (!foundProduct) throw new AppError("Produto não encontrado", 400);

      const filename = file?.filename || "";
      const diskStorage = new DiskStorage();
      const avatar = !!file
        ? await diskStorage.saveFile(filename) // retorna o id do arquivo - avatar
        : undefined;

      if (!!avatar) {
        await diskStorage.deleteFile(foundProduct.avatar);
      }

      foundProduct.avatar = avatar || foundProduct.avatar;
      foundProduct.name = name || foundProduct.name;
      foundProduct.description =
        description?.trim() || foundProduct.description;
      foundProduct.category = category || foundProduct.category;
      foundProduct.price = price || foundProduct.price;

      foundProduct.ingredients = Array.isArray(ingredients) ? ingredients : [];

      foundProduct.name = name || foundProduct.name;

      const updatedProduct = await this.productsRepository.update(foundProduct);
      return updatedProduct;
    } catch (error: any) {
      if (error.errors?.length > 0)
        console.error(error.errors.map((err: any) => err.message).join(", "));
      else console.error(error);
      throw new AppError("Insira dados válidos para atualizar o produto", 400);
    }
  }
}
