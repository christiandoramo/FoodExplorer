import React, { useRef, useState } from "react";
import { Product } from "../../../interfaces/product";
import { capitalizeFirstLetter } from "../../../utils/strings";
import { CarouselContainer, CarouselInner, Container } from "./styles";
import { Card } from "./card";
import { toast } from "react-toastify";

interface CarouselProps {
  productsByCategory: Product[];
  user: User;
}

export const Row: React.FC<CarouselProps> = ({ productsByCategory, user }) => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const dragging = useRef(false);
  //const cardWidth = useRef(0);

  const [cart, setCart] = useState<{ id: String; amount: number }[]>([]);

  const handleInclude = (product: Product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (!!existingProduct) {
      CartService.addMultiplesToCart(product.id, existingProduct.amount);
      toast.success(`${existingProduct.amount}x ${product.name} adicionado`);
    } else {
      CartService.addMultiplesToCart(product.id, 1);
      toast.success(`1x ${product.name} adicionado`);
    }
  };

  const handleProductAmount = (product: Product, plusOrMinus: String) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        // Atualizar a quantidade do produto existente
        if (plusOrMinus === "plus" && existingProductIndex) {
          const updatedCart = [...prevCart];
          updatedCart[existingProductIndex].amount =
            updatedCart[existingProductIndex].amount < 99
              ? updatedCart[existingProductIndex].amount + 1
              : updatedCart[existingProductIndex].amount + 0;
          return updatedCart;
        } else if (plusOrMinus === "minus") {
          const updatedCart = [...prevCart];
          updatedCart[existingProductIndex].amount =
            updatedCart[existingProductIndex].amount > 1
              ? updatedCart[existingProductIndex].amount - 1
              : updatedCart[existingProductIndex].amount - 0;
          return updatedCart;
        }
      }
      // Adicionar um novo produto ao carrinho
      return [...prevCart, { id: product.id, amount: 1 }];
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const deltaX = e.clientX - startX.current;
    const maxOffset =
      (productsByCategory.length - 1) *
      (containerRef.current?.offsetWidth || 0);
    const newOffset = Math.min(Math.max(offset - deltaX, 0), maxOffset);
    setOffset(newOffset);
    startX.current = e.clientX;
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    const deltaX = e.touches[0].clientX - startX.current;
    const maxOffset =
      (productsByCategory.length - 1) *
      (containerRef.current?.offsetWidth || 0);
    const newOffset = Math.min(Math.max(offset - deltaX, 0), maxOffset);
    setOffset(newOffset);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    dragging.current = false;
  };

  const getProductAmount = (productId: string): number => {
    const item = cart.find((item) => item.id === productId);
    if (item) return item.amount;
    else return 1;
  };

  return (
    <Container>
      <h2>{capitalizeFirstLetter(productsByCategory[0].name)}</h2>

      <CarouselContainer
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CarouselInner offset={offset}>
          {productsByCategory.map((product, index) => (
            <Card
              handleProductAmount={handleProductAmount}
              handleInclude={handleInclude}
              productAmount={getProductAmount(product.id)}
              product={product}
              user={user}
              key={index}
            />
          ))}
        </CarouselInner>
      </CarouselContainer>
    </Container>
  );
};
