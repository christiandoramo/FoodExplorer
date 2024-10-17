import React, { useEffect, useState } from "react";
import {
  Container,
  CreateNewDishButton,
  CreateContainer,
  // IngredientContainer,
  PageLabelContainer,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productService } from "../../services/products";
import { useNavigate } from "react-router-dom";
import { ProductRegisterData } from "../../interfaces/product";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { BackButton } from "../../components/back-button";
import { NameInput } from "../../components/forms/product-register/name-input";
import { PriceInput } from "../../components/forms/product-register/price-input";
import { UploadInput } from "../../components/forms/product-register/upload-input";
// import { IngredientItem } from "../../components/ingredient-item";
// import { toast } from "react-toastify";
import { CategorySelect } from "../../components/forms/product-register/category-select";
import { TextAreaInput } from "../../components/forms/product-register/text-area";
import { IngredientsInput } from "../../components/forms/product-register/ingredients-input";

export const ingredientSchema = z.object({
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
  category: z.string().min(3, "Selecione uma categoria"),
  description: z.string().min(1, "Insira alguma descrição"),
  price: z.string().min(1, "O preço é obrigatório"), // Aqui garantimos que o valor será numérico, mas sem o "R$"
  file: z
    .instanceof(File, { message: "Insira a imagem do produto" }) //+conversationId":"fac3d0e0-08e8-4d2f-8817-07e45a0bf925","source":"instruct"}
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
  const [categories, setCategories] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Estado para armazenar a imagem

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setValue("file", file); // Definir o arquivo no formulário
      const fileURL = URL.createObjectURL(file); // Criar URL temporária da imagem
      setImagePreview(fileURL); // Atualizar o estado com a URL da imagem
    }
  }
  const createProduct = async (data: ProductRegisterData): Promise<void> => {
    const price = parseFloat(
      data.price.replace("R$", "").replace(",", ".").trim()
    );
    const formData = new FormData();
    const ingredients =
      data.ingredients.map((ingredient) => ingredient.name) || [];
    formData.append("file", data.file, data.file.name);
    formData.append("name", data.name);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("price", JSON.stringify(price)); // Converte o número para string antes de enviar
    formData.append("category", data.category);
    formData.append("description", data.description);

    const createResponse = await productService.createProduct(formData);
    if (createResponse) {
      if (createResponse.status === 200 || createResponse.status === 201) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const foundCategories = await productService.findAllCategories();
      setCategories(foundCategories);
    };
    getAllCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit(createProduct)}>
      <Container className="bg-dark-400">
        <Navbar />
        <PageLabelContainer>
          <BackButton />
          <h1 className="text-light-100 medium-400">Adicionar prato</h1>
        </PageLabelContainer>
        <CreateContainer>
          <div>
            <img src={imagePreview || "./dishes.gif"} alt="Pré-visualização" />
          </div>
          <UploadInput
            label="Imagem do prato"
            name="file"
            register={register}
            error={errors.file}
            registerOptions={{ required: true }}
            onChange={handleImageUpload}
          />
          <NameInput
            label="Nome"
            name="name"
            placeholder="Ex: Salada Caesar"
            register={register}
            error={errors.name}
            registerOptions={{ required: true }}
          />
          <CategorySelect
            name="category"
            placeholder="Selecione uma categoria"
            label="Categoria"
            categories={categories?.length ? categories : []}
            registerOptions={{ required: true }}
            error={errors.category}
            register={register}
            setValue={setValue}
          />
          <IngredientsInput
            label="Ingredientes"
            name="ingredients"
            register={register}
            error={errors.ingredients}
            registerOptions={{ required: true }}
            getValues={getValues}
            setValue={setValue}
          />
          <PriceInput
            label="Preço"
            name="price"
            placeholder="R$ 00,00"
            register={register}
            error={errors.price}
            registerOptions={{ required: true }}
            setValue={setValue}
          />
          <TextAreaInput
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
