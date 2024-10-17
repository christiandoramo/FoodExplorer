import React, { useEffect, useState } from "react";
import {
  Container,
  InfoContainer,
  InteractionButton,
  ProductImage,
  ProductInfoContainer,
} from "./styles";
//import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { BackButton } from "../../components/back-button";
import { useAuth } from "../../contexts/auth";
import { USER_ROLES } from "../../enums/users";
import { formatToAmount, formatToBRL } from "../../utils/strings";
import { useParams } from "react-router-dom";
import { Product } from "../../interfaces/product";
import { productService } from "../../services/products";
import CartService from "../../services/cart";

export const ProductInfo: React.FC<any> = () => {
  //const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);

  const { id } = useParams();
  const productAmount = id ? CartService.getProductAmount(id) : 0;

  useEffect(() => {
    const findProduct = async () => {
      if (id) {
        await productService.getProductById(id).then((response) => {
          setProduct(response);
        });
      }
    };
    findProduct();
  }, [id]);

  return (
    <Container className="bg-gradient-200">
      <Navbar />
      <InfoContainer>
        <BackButton />
        <InfoContainer>
          <ProductImage
            src={`${import.meta.env.VITE_BACKEND_NODE_HOST}/uploads/${
              product?.avatar
            }`}
          />
          <ProductInfoContainer>
            <h2>{product?.name}</h2>
            <h3>{product?.description}</h3>
            <h3>{formatToBRL((product?.price || 0).toString())}</h3>
            <h3>{product?.ingredients.map((ing) => ing.name)}</h3>
            {user?.role === USER_ROLES.ADMIN && (
              <InteractionButton>Editar</InteractionButton>
            )}
            {user?.role === USER_ROLES.DEFAULT && ( // colocar aqui incluir para customer
              <InteractionButton>{`Incluir (${formatToAmount(
                productAmount
              )})`}</InteractionButton>
            )}
          </ProductInfoContainer>
        </InfoContainer>
      </InfoContainer>
      <Footer />
    </Container>
  );
};
