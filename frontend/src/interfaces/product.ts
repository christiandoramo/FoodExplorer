import { PRODUCT_CATEGORY } from "../enums/category";
import { IngredientData } from "./ingredientData";

export interface Product {
  name: string;
  ingredients: IngredientData[];
  category: PRODUCT_CATEGORY;
  description: string;
  price: number;
  avatar?: string;
  id: string;
}

export interface ProductRegisterData {
  name: string;
  ingredients: IngredientData[];
  category: PRODUCT_CATEGORY;
  description: string;
  price: number;
  file: File;
}
