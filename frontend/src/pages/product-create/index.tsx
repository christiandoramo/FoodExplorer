import React, { useState } from "react";
import {
  Container,
  CreateNewDishButton,
  CreateContainer,
  IngredientContainer,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productService } from "../../services/products";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CATEGORY } from "../../enums/category";
import { ProductRegisterData } from "../../interfaces/product";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { BackButton } from "../../components/back-button";
import { NameInput } from "../../components/forms/product-register/name-input";
import { PriceInput } from "../../components/forms/product-register/price-input";
import { UploadInput } from "../../components/forms/product-register/upload-input";
import { TextInput } from "../../components/forms/product-register/text-input";
import { IngredientItem } from "../../components/ingredient-item";
import { toast } from "react-toastify";

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
  name: z.string().min(2, "O nome é obrigatório"),
  category: z.nativeEnum(PRODUCT_CATEGORY),
  description: z.string().min(1, "Insira alguma descrição"),
  price: z.number().positive("O preço deve ser um número positivo"),
  file: z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= MAX_FILE_SIZE;
    }, "O arquivo deve ser menor do que 5MB")
    .refine((file) => {
      return ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, "Insira uma imagem válida .png .jpg .jpeg .webp"),
  ingredients: z.array(ingredientSchema),
});

type CreateProductSchema = z.infer<typeof productCreateSchema>;

export const ProductCreate: React.FC<any> = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
      ingredients: [],
    },
  });
  const navigate = useNavigate();
  const [newIngredient, setNewIngredient] = useState<string>("");

  function handleAddIngredient() {
    const ingredients = getValues("ingredients");
    if (ingredients.some((ingredient) => ingredient.name === newIngredient)) {
      toast.warning(`Ingrediente ${newIngredient} já registrado`);
      return;
    }
    if (newIngredient) {
      setValue(
        "ingredients",
        [...ingredients, { name: newIngredient.trim() }],
        { shouldValidate: true }
      );
      setNewIngredient("");
    }
  }
  function handleRemoveIngredient(ingredientToDelete: string) {
    const ingredients = getValues("ingredients");
    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient.name !== ingredientToDelete
    );
    setValue("ingredients", filteredIngredients, { shouldValidate: true });
  }

  const createProduct = async (data: ProductRegisterData): Promise<void> => {
    const formData = new FormData();
    const ingredients = data.ingredients || [];
    formData.append("file", data.file);
    formData.append("name", data.name);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("price", JSON.stringify(data.price));
    formData.append("category", JSON.stringify(data.category));
    formData.append("description", data.description);

    const createResponse = await productService.createProduct(data);
    if (createResponse) {
      if (createResponse.status === 200 || createResponse.status === 201) {
        navigate("/");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(createProduct)}>
      <Container className="bg-home">
        <Navbar />
        <CreateContainer>
          <BackButton />
          <h1 className="text-light-100 medium-400">Adicionar prato</h1>
          <UploadInput
            label="Imagem do prato"
            name="file"
            register={register}
            error={errors.file}
            registerOptions={{ required: true }}
          />
          <NameInput
            label="Nome"
            name="name"
            placeholder="Ex: Salada Caesar"
            register={register}
            error={errors.name}
            registerOptions={{ required: true }}
          />
          <IngredientContainer>
            {getValues("ingredients") &&
              getValues("ingredients").map((ingredient, index) => {
                return (
                  <IngredientItem
                    isnew={false}
                    key={index}
                    value={ingredient.name}
                    onClick={() => handleRemoveIngredient(ingredient.name)}
                  />
                );
              })}
            <IngredientItem
              isnew
              value={newIngredient}
              placeholder="Adicionar"
              onChange={(e) => setNewIngredient(e.target.value)}
              onClick={handleAddIngredient}
            />
          </IngredientContainer>
          <PriceInput
            label="Preço"
            name="price"
            placeholder="R$ 00,00"
            register={register}
            error={errors.price}
            registerOptions={{ required: true }}
          />
          <TextInput
            label="Descrição"
            name="description"
            placeholder="Insira a descrição sobre o prato aqui"
            register={register}
            error={errors.description}
            registerOptions={{ required: true }}
          />
          <CreateNewDishButton
            className="bg-tints-tomato-100 text-light-100"
            type="submit"
          >
            Criar prato
          </CreateNewDishButton>
        </CreateContainer>
        <Footer />
      </Container>
    </form>
  );
};
