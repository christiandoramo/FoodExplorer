import React, { useRef, useState } from "react";
import { Product } from "../../../interfaces/product";
import { capitalizeFirstLetter } from "../../../utils/strings";
import { CarouselContainer, CarouselInner, Container } from "./styles";
import { Card } from "./card";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface CarouselProps {
  productsByCategory: Product[];
  user: User | null;
}

export const Row: React.FC<CarouselProps> = ({ productsByCategory, user }) => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const dragging = useRef(false);

  const cardWidth = 300; // Ajuste conforme a largura real do card
  const gap = 16;

  const handlePrevClick = () => {
    const newOffset = Math.max(offset - (cardWidth + gap), 0);
    setOffset(newOffset);
  };

  const handleNextClick = () => {
    const maxOffset =
      productsByCategory.length * (cardWidth + gap) -
      (containerRef.current?.offsetWidth || 0);
    const newOffset = Math.min(offset + (cardWidth + gap), maxOffset);
    setOffset(newOffset);
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

  return (
    <Container>
      <h2 className="text-light-300">
        {capitalizeFirstLetter(productsByCategory[0].category)}
      </h2>
      <div className="row-container">
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
          <CaretLeft
            className="text-light-100 arrowLeft"
            onClick={handlePrevClick}
            cursor={"pointer"}
            size={40}
          />
          <CarouselInner offset={offset}>
            {productsByCategory.map((product, index) => (
              <Card product={product} user={user} key={index} />
            ))}
          </CarouselInner>
          <CaretRight
            className="text-light-100 arrowRight"
            onClick={handleNextClick}
            cursor={"pointer"}
            size={40}
          />
        </CarouselContainer>
      </div>
    </Container>
  );
};
