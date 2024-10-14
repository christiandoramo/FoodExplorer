import React, { useState } from "react";
import { IngredientsInputContainer, InputContainer } from "./styles";
import { IngredientItem } from "../../ingredient-item";
import { toast } from "react-toastify";
import { z } from "zod";
import { ingredientSchema } from "../../../pages/product-create";

type ingredientType = z.infer<typeof ingredientSchema>;

export const IngredientsInput: React.FC<FormIngredientsProps> = ({
  label,
  name,
  register,
  error,
  setValue,
  getValues,
}) => {
  const [newIngredient, setNewIngredient] = useState<string>("");

  function handleAddIngredient() {
    const ingredients = getValues(register.name) || [];
    console.log(newIngredient);
    if (
      ingredients.some((ingredient: any) => ingredient?.name === newIngredient)
    ) {
      toast.warning(`Ingrediente ${newIngredient} já registrado`);
      return;
    }
    if (newIngredient) {
      setValue(
        register.name,
        [...ingredients, { name: newIngredient.trim() }],
        { shouldValidate: true }
      );
      setNewIngredient("");
    }
  }
  function handleRemoveIngredient(ingredientToDelete: string) {
    const ingredients = getValues(register.name);
    const filteredIngredients = ingredients.filter(
      (ingredient: ingredientType) => ingredient.name !== ingredientToDelete
    );
    setValue(register.name, filteredIngredients, { shouldValidate: true });
  }

  return (
    <InputContainer>
      <label className="text-light-400 roboto small-regular" htmlFor={name}>
        {label}
      </label>
      <IngredientsInputContainer className="bg-dark-900">
        {getValues(register.name) &&
          getValues(register.name).map(
            (ingredient: ingredientType, index: number) => {
              return (
                <IngredientItem
                  isnew={false}
                  key={index}
                  value={ingredient.name}
                  onClick={() => handleRemoveIngredient(ingredient.name)}
                />
              );
            }
          )}
        <IngredientItem
          isnew
          value={newIngredient}
          placeholder="Adicionar"
          onChange={(e) => setNewIngredient(e.target.value)}
          onClick={handleAddIngredient}
        />
      </IngredientsInputContainer>
      {error && (
        <span className="text-tints-tomato-400 roboto small-regular">
          {error.message}
        </span>
      )}
    </InputContainer>
  );
};
