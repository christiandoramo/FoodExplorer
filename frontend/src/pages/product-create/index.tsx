import React from "react";
import { Container, CreateNewDishButton, CreateContainer } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productService } from "../../services/products";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CATEGORY } from "../../enums/category";
import { ProductRegisterData } from "../../interfaces/product";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { BackButton } from "../../components/backButton";
import { NameInput } from "../../components/forms/product-register/name-input";
import { PriceInput } from "../../components/forms/product-register/price-input";
import { UploadInput } from "../../components/forms/product-register/upload-input";

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
  ingredients: z.array(ingredientSchema).min(1, "Descreva o ingrediente"),
});

type CreateProductSchema = z.infer<typeof productCreateSchema>;

export const ProductCreate: React.FC<any> = () => {
  const {
    register,
    handleSubmit,
    //reset,
    formState: { errors },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(productCreateSchema),
  });
  const navigate = useNavigate();

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
          <PriceInput
            label="Preço"
            name="price"
            placeholder="R$ 00,00"
            register={register}
            error={errors.price}
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
