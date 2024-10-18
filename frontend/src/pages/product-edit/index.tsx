import React, { useEffect, useState } from "react";
import {
  Container,
  EditNewDishButton,
  EditContainer,
  PageLabelContainer,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productService } from "../../services/products";
import { useNavigate, useParams } from "react-router-dom";
import { ProductUpdateData } from "../../interfaces/product";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { BackButton } from "../../components/back-button";
import { NameInput } from "../../components/forms/product-register/name-input";
import { PriceInput } from "../../components/forms/product-register/price-input";
import { UploadInput } from "../../components/forms/product-register/upload-input";
import { CategorySelect } from "../../components/forms/product-register/category-select";
import { TextAreaInput } from "../../components/forms/product-register/text-area";
import { IngredientsInput } from "../../components/forms/product-register/ingredients-input";
import { toast } from "react-toastify";
import { formatToBRL } from "../../utils/strings";

export const ingredientSchema = z.object({
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

const productEditSchema = z.object({
  name: z.string().min(2, "O nome é obrigatório").optional(),
  category: z.string().min(3, "Selecione uma categoria").optional(),
  description: z.string().min(1, "Insira alguma descrição").optional(),
  price: z.string().min(1, "O preço é obrigatório").optional(),
  ingredients: z.array(ingredientSchema).optional(),
  file: z
    .custom<File | undefined>(
      (value) => {
        console.log("desgraca: ", value);

        // Verifica se o valor é um FileList e pega o primeiro arquivo
        const file = value instanceof FileList ? value[0] : value;

        if (file === undefined || file instanceof File) {
          return true; // Válido se for undefined ou File
        }
        return false; // Inválido em outros casos
      },
      {
        message: "O arquivo precisa ser uma imagem válida.",
      }
    )
    .optional() // Arquivo opcional
    .refine(
      (file) => {
        const validFile = file instanceof FileList ? file[0] : file;
        return !validFile || validFile.size <= MAX_FILE_SIZE;
      },
      {
        message: "Tamanho máximo da imagem deve ser 5MB",
      }
    )
    .refine(
      (file) => {
        const validFile = file instanceof FileList ? file[0] : file;
        return !validFile || ACCEPTED_IMAGE_TYPES.includes(validFile?.type);
      },
      {
        message: "Formatos aceitos: .jpg, .webp, .jpeg e .png.",
      }
    ),
});

type EditProductSchema = z.infer<typeof productEditSchema>;

export const ProductEdit: React.FC<any> = () => {
  const id: string = useParams()?.id || "null";
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Estado para armazenar a imagem
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<EditProductSchema>({
    resolver: zodResolver(productEditSchema),
    defaultValues: async () => {
      const foundProduct = await productService.getProductById(id);
      if (!!foundProduct) {
        setImagePreview(
          `${import.meta.env.VITE_BACKEND_NODE_HOST}/uploads/${
            foundProduct.avatar
          }`
        );
      }
      const defaultProduct = {
        name: foundProduct.name || "",
        category: foundProduct.category || "",
        description: foundProduct.description || "",
        price: formatToBRL(foundProduct.price.toString()) || "",
        ingredients: foundProduct?.ingredients || [],
        file: undefined,
      };
      console.log(defaultProduct);
      return defaultProduct;
    },
  });
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setValue("file", file);
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
    }
  }

  const editProduct = async (data: ProductUpdateData): Promise<void> => {
    const formData = new FormData();

    if (!!data?.file) {
      formData.append("file", data.file);
    }
    // Processa o preço, se existir
    if (data?.price) {
      const price = parseFloat(
        data.price.replace("R$", "").replace(",", ".").trim()
      );
      formData.append("price", JSON.stringify(price));
    }

    if (data?.name) {
      formData.append("name", data.name);
    }

    if (data?.ingredients) {
      if (data?.ingredients?.length > 0) {
        const ingredients = data.ingredients.map((ingredient) => () => {
          if (ingredient?.id) {
            return {
              id: ingredient?.id,
              name: ingredient?.name || ingredient,
            };
          } else {
            return {
              name: ingredient?.name || ingredient,
            };
          }
        });
        formData.append("ingredients", JSON.stringify(ingredients));
      } else {
        formData.append(
          "ingredients",
          JSON.stringify(data.ingredients[0]?.name || data.ingredients[0])
        );
      }
    }

    if (data?.category) {
      formData.append("category", data.category);
    }

    if (data?.description) {
      formData.append("description", data.description);
    }
    const editResponse = await productService.updateProduct(id, formData);

    let atributosVazios = false;
    for (const atr of Object.values(data)) {
      if (!!atr !== undefined) {
        atributosVazios = true;
        break;
      }
    }
    if (!!atributosVazios) {
      toast.warning("voce nao fez nenhuma alteracao");
      return;
    }
    if (editResponse) {
      if (editResponse.status === 200 || editResponse.status === 201) {
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
    <form onSubmit={handleSubmit(editProduct)}>
      <Container className="bg-dark-400">
        <Navbar />
        <PageLabelContainer>
          <BackButton />
          <h1 className="text-light-100 medium-400">Adicionar prato</h1>
        </PageLabelContainer>
        <EditContainer>
          <div>
            <img src={imagePreview || "./dishes.gif"} alt="Pré-visualização" />
          </div>
          <UploadInput
            label="Imagem do prato"
            name="file"
            register={register}
            error={errors.file}
            registerOptions={{ required: false }}
            onChange={handleImageUpload}
          />
          <NameInput
            label="Nome"
            name="name"
            placeholder="Ex: Salada Caesar"
            register={register}
            error={errors.name}
            registerOptions={{ required: false }}
          />
          <CategorySelect
            name="category"
            placeholder="Selecione uma categoria"
            label="Categoria"
            categories={categories?.length ? categories : []}
            registerOptions={{ required: false }}
            error={errors.category}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
          <IngredientsInput
            label="Ingredientes"
            name="ingredients"
            register={register}
            error={errors.ingredients}
            registerOptions={{ required: false }}
            getValues={getValues}
            setValue={setValue}
          />
          <PriceInput
            getValues={getValues}
            label="Preço"
            name="price"
            placeholder="R$ 00,00"
            register={register}
            error={errors.price}
            registerOptions={{ required: false }}
            setValue={setValue}
            defaultValue={getValues("price")}
          />
          <TextAreaInput
            label="Descrição"
            name="description"
            placeholder="Insira a descrição sobre o prato aqui"
            register={register}
            error={errors.description}
            registerOptions={{ required: false }}
          />
          <EditNewDishButton
            className="bg-tints-tomato-100 text-light-100"
            type="submit"
          >
            Criar prato
          </EditNewDishButton>
        </EditContainer>
        <Footer />
      </Container>
    </form>
  );
};
