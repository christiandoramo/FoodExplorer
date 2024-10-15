import { IngredientData } from "./ingredientData";

export interface Product {
  name: string;
  ingredients: IngredientData[];
  category: string;
  description: string;
  price: number;
  avatar?: string;
  id: string;
}

export interface ProductRegisterData {
  name: string;
  ingredients: IngredientData[];
  category: string;
  description: string;
  price: string;
  file: File;
}
