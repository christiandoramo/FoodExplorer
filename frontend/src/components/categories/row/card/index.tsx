import {
  HeartStraight,
  Minus,
  PencilSimple,
  Plus,
} from "@phosphor-icons/react";
import { Product } from "../../../../interfaces/product";
import {
  Container,
  IncludeButton,
  SecundaryActionComponent,
  Thumbnail,
} from "./styles";
import { USER_ROLES } from "../../../../enums/users";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatToAmount, formatToBRL } from "../../../../utils/strings";
import CartService from "../../../../services/cart";

interface CardProps {
  product: Product;
  user: User | null;
}

export const Card: React.FC<CardProps> = ({ product, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSetFavoritLoading, setIsSetFavoritLoading] = useState(false);
  const [toInclude, setToInclude] = useState<number>(1);

  const toggleFavorite = () => {
    setIsSetFavoritLoading(true);
    setTimeout(() => {
      setIsSetFavoritLoading(false);
      setIsFavorite((prev: boolean) => !prev);
    }, 300);
  };
  const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/product-info/${product.id}`);
  };

  const onPencilClick = () => {
    navigate(`/product-edit/${product.id}`);
  };

  return (
    <Container className={"bg-dark-200 text-light-100"}>
      <Thumbnail
      onClick={onCardClick}
        src={`${import.meta.env.VITE_BACKEND_NODE_HOST}/uploads/${
          product?.avatar
        }`}
      />
      <SecundaryActionComponent>
        {user?.role === USER_ROLES.ADMIN ? (
          <PencilSimple
            cursor={"pointer"}
            onClick={onPencilClick}
            z={2}
            size={32}
          />
        ) : (
          <HeartStraight
            className="heart"
            z={2}
            size={32}
            weight={!isFavorite ? "regular" : "fill"}
            color={"red"}
            onClick={toggleFavorite}
            aria-disabled={isSetFavoritLoading}
            cursor={"pointer"}
          />
        )}
      </SecundaryActionComponent>
      <div
        onClick={onCardClick}
        className="name-container text-light-300 bold-300"
      >
        {product.name + " >"}
      </div>
      <div 
      className="description-container smallest-regular text-light-400">
        {product.description}
      </div>
      <div 
      className="price-container biggest-regular text-tints-cake-200">
        {formatToBRL((product.price * toInclude).toString())}
      </div>
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
                  CartService.getProductAmount(product.id) + 1 < 99
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
                productId: product.id,
                amount: toInclude,
                name: product.name,
              })
            }
          >
            incluir
          </IncludeButton>
        </div>
      )}
    </Container>
  );
};
