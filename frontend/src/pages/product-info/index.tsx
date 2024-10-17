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
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../../interfaces/product";
import { productService } from "../../services/products";
import CartService from "../../services/cart";
import { Minus, Plus } from "@phosphor-icons/react";

export const ProductInfo: React.FC<any> = () => {
  //const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [toInclude, setToInclude] = useState<number>(1);
  const navigate = useNavigate();
  const { id } = useParams();

  const onCardClick = () => {
    navigate(`/product-edit/${id}`);
  };

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
            <h3>
              {product?.ingredients.map((ing, index) =>
                index === product?.ingredients.length - 1
                  ? ing.name + "."
                  : ing.name + ", "
              )}
            </h3>
            {user?.role === USER_ROLES.ADMIN && (
              <InteractionButton onClick={onCardClick}>
                Editar
              </InteractionButton>
            )}
            {user?.role === USER_ROLES.DEFAULT && product && (
              // colocar aqui incluir para customer
              <div>
                <Minus
                  onClick={() =>
                    setToInclude((prev: number) => {
                      if (prev > 1) return prev - 1;
                      else return prev;
                    })
                  }
                  cursor={"pointer"}
                  size={32}
                />
                <div>{formatToAmount(toInclude)}</div>
                <Plus
                  onClick={() =>
                    setToInclude((prev: number) => {
                      if (
                        prev < 99 &&
                        CartService.getProductAmount(product.id) + 1 < 99
                      )
                        return prev + 1;
                      else return prev;
                    })
                  }
                  cursor={"pointer"}
                  size={32}
                />
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    CartService.addMultiplesToCart({
                      productId: product.id,
                      amount: toInclude,
                      name: product.name,
                    })
                  }
                >
                  Incluir
                </div>
              </div>
            )}
          </ProductInfoContainer>
        </InfoContainer>
      </InfoContainer>
      <Footer />
    </Container>
  );
};
