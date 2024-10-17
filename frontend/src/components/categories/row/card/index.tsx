import {
  CaretRight,
  HeartStraight,
  Minus,
  PencilSimple,
  Plus,
} from "@phosphor-icons/react";
import { Product } from "../../../../interfaces/product";
import { Container, SecundaryActionComponent, Thumbnail } from "./styles";
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
      setIsFavorite(!isFavorite);
    }, 1000);
  };
  const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/product-info/${product.id}`);
  };

  return (
    <Container className={"bg-dark-200 text-light-100"}>
      <Thumbnail
        src={`${import.meta.env.VITE_BACKEND_NODE_HOST}/uploads/${
          product?.avatar
        }`}
      />
      <SecundaryActionComponent>
        {user?.role === USER_ROLES.ADMIN ? (
          <PencilSimple z={2} size={32} />
        ) : (
          <HeartStraight
            z={2}
            size={32}
            weight={!isFavorite ? "regular" : "fill"}
            color={"red"}
            onClick={toggleFavorite}
            aria-disabled={isSetFavoritLoading}
          />
        )}
      </SecundaryActionComponent>
      <div>
        {product.name}
        <CaretRight onClick={onCardClick} size={32} />
      </div>
      <div>{product.description}</div>
      <div>{formatToBRL((product.price * toInclude).toString())}</div>
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
    </Container>
  );
};
