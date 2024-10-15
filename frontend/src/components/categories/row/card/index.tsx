import {
  CaretRight,
  HeartStraight,
  Minus,
  PencilSimple,
  Plus,
} from "@phosphor-icons/react";
import { Product } from "../../../../interfaces/product";
import { Container, SecundaryActionComponent } from "./styles";
import { USER_ROLES } from "../../../../enums/users";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatToAmount, formatToBRL } from "../../../../utils/strings";

interface CardProps {
  product: Product;
  user: User | null;
  handleProductAmount: (product: Product, plusOrMinus: String) => void;
  handleInclude: (product: Product) => void;
  productAmount: number;
}

export const Card: React.FC<CardProps> = ({
  product,
  user,
  handleProductAmount,
  handleInclude,
  productAmount,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSetFavoritLoading, setIsSetFavoritLoading] = useState(false);

  const toggleFavorite = () => {
    setIsSetFavoritLoading(true);
    setTimeout(() => {
      setIsSetFavoritLoading(false);
      setIsFavorite(!isFavorite);
    }, 1000);
  };
  const navigate = useNavigate();

  const onCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Container className={"bg-dark-200"}>
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
      <div>{formatToBRL((product.price * productAmount).toString())}</div>
      <div>
        <Minus
          onClick={() => handleProductAmount(product, "minus")}
          cursor={"pointer"}
          size={32}
        />
        <div>{formatToAmount(productAmount)}</div>
        <Plus
          onClick={() => handleProductAmount(product, "plus")}
          cursor={"pointer"}
          size={32}
        />
        <div onClick={() => handleInclude(product)}>Incluir</div>
      </div>
    </Container>
  );
};
