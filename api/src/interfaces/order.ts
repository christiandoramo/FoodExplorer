import { PAYMENT_METHOD } from "../enums/method";
import { ItemProductCreateBodySchema } from "./itemProduct";

export interface OrderCreateSchema {
  user_id: string;
  itemsProducts: {
    product_id: string;
    quantity: number;
  }[];
  amount: number;
  method: PAYMENT_METHOD;
}
