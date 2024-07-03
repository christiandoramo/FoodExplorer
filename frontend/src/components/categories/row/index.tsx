import React, { useRef, useState } from "react";
import { Product } from "../../../interfaces/product";
import { capitalizeFirstLetter } from "../../../utils/strings";
import { CarouselContainer, CarouselInner, Container } from "./styles";
import { Card } from "./card";

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
            <Card product={product} user={user} key={index} />
          ))}
        </CarouselInner>
      </CarouselContainer>
    </Container>
  );
};
