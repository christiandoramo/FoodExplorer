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
import { formatToBRL } from "../../../../utils/strings";

interface CardProps {
  product: Product;
  user: User;
}

export const Card: React.FC<CardProps> = ({ product, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSetFavoritLoading, setIsSetFavoritLoading] = useState(false);
  const [productAmount, setProductAmount] = useState<number>(0);

  const handleProductAmount = (plusOrMinus: string) => {
    if (plusOrMinus === "plus" && productAmount < 99)
      setProductAmount((prev) => prev + 1);
    else if (plusOrMinus === "minus" && productAmount >= 1)
      setProductAmount((prev) => prev - 1);
  };

  const handleInclude = () => {
    CartService.addMultiplesToCart(product.id, productAmount);
  };

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
        {user.role === USER_ROLES.ADMIN ? (
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
      <div>{formatToBRL(product.price)}</div>
      <div>
        <Minus
          onClick={() => handleProductAmount("minus")}
          cursor={"pointer"}
          size={32}
        />
        <div>{CartService.getProductCount(product.id)}</div>
        <Plus
          onClick={() => handleProductAmount("plus")}
          cursor={"pointer"}
          size={32}
        />
        <div onClick={handleInclude}>Incluir</div>
      </div>
    </Container>
  );
};
