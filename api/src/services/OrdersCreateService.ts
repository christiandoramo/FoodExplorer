import AppError from "../utils/AppError";
import { z } from "zod";
import { PAYMENT_METHOD } from "../enums/method";
import { OrdersRepository } from "../repositories/OrdersRepository";
import { ItemsProductsRepository } from "../repositories/ItemsProductsRepository";

const itemsProductsSchema = z.object({
  product_id: z.string().min(1, "O id de um produto é obrigatório"),
  quantity: z.number().min(1, "Quantidade de cada item deve ser 1 ou superior"),
});

const orderCreateSchema = z.object({
  user_id: z.string().min(1, "O id do usuário é obrigatório"),
  method: z.nativeEnum(PAYMENT_METHOD),
  // amount: z.number().positive("O valor deve ser um número positivo"),
  itemsProducts: z
    .array(itemsProductsSchema)
    .min(1, "O pedido deve ter pelo menos um item"),
});

type OrderCreateType = z.infer<typeof orderCreateSchema>;

export class OrdersCreateService {
  ordersRepository;
  itemsProductRepository;
  constructor(
    ordersRepository: OrdersRepository,
    itemsProductRepository: ItemsProductsRepository
  ) {
    this.ordersRepository = ordersRepository;
    this.itemsProductRepository = itemsProductRepository;
  }
  async execute({ user_id, itemsProducts, method }: OrderCreateType) {
    try {
      orderCreateSchema.safeParse({
        user_id,
        itemsProducts,
        method,
      });
      const newOrder = await this.ordersRepository.create({
        user_id,
        itemsProducts,
        method,
      });
      if (!newOrder) throw new AppError("Ocorreu um erro ao criar pedido", 500);
      return newOrder;
    } catch (error: any) {
      if (error.errors?.length > 0)
        console.error(error.errors.map((err: any) => err.message).join(", "));
      else console.error(error);
      throw new AppError("Insira dados válidos para registrar o produto", 400);
    }
  }
}
