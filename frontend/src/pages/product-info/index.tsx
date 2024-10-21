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
import { IncludeButton } from "../../components/categories/row/card/styles";

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
    <Container className="bg-dark-400">
      <Navbar />
      <div className="back-button-container">
        <BackButton />
      </div>
      <InfoContainer>
        <ProductImage>
          <img
            src={`${import.meta.env.VITE_BACKEND_NODE_HOST}/uploads/${
              product?.avatar
            }`}
          />
        </ProductImage>
        <ProductInfoContainer>
          <h2 className="text-light-300 medium-500">{product?.name}</h2>
          <h3 className="text-light-300 300-regular">{product?.description}</h3>
          <div className="ingredient-container">
            {product?.ingredients.map((ing, index) =>
              index === product?.ingredients.length - 1 ? (
                <h3 className="text-light-100 100-medium bg-dark-1000 ingredient">
                  {ing.name}
                </h3>
              ) : (
                <h3 className="text-light-100 100-medium bg-dark-1000 ingredient">
                  {ing.name}
                </h3>
              )
            )}
          </div>
          {user?.role === USER_ROLES.ADMIN && (
            <div className="include-container">
              <h3 className="text-light-300 300-regular">
                {formatToBRL((product?.price || 0).toString())}
              </h3>
              <InteractionButton
                className="bg-tints-tomato-100 text-light-300"
                onClick={onCardClick}
              >
                Editar prato
              </InteractionButton>
            </div>
          )}
          {user?.role === USER_ROLES.DEFAULT && (
            <div className="include-container">
              <Minus
                className="text-light-300"
                onClick={() =>
                  setToInclude((prev: number) => {
                    if (prev > 1) return prev - 1;
                    else return prev;
                  })
                }
                cursor={"pointer"}
                size={32}
              />
              <div className="text-light-300">{formatToAmount(toInclude)}</div>
              <Plus
                className="text-light-300"
                onClick={() =>
                  setToInclude((prev: number) => {
                    if (
                      prev < 99 &&
                      CartService.getProductAmount(product?.id || "") + 1 < 99
                    )
                      return prev + 1;
                    else return prev;
                  })
                }
                cursor={"pointer"}
                size={32}
              />
              <IncludeButton
                className="bg-tints-tomato-100 text-light-300"
                onClick={() =>
                  CartService.addMultiplesToCart({
                    productId: product?.id || "",
                    amount: toInclude,
                    name: product?.name || "",
                  })
                }
              >
                incluir ∙{" "}
                {formatToBRL((toInclude * (product?.price || 1)).toString())}
              </IncludeButton>
            </div>
          )}
        </ProductInfoContainer>
      </InfoContainer>
      <Footer />
    </Container>
  );
};
