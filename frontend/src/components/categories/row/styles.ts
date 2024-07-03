import styled from "styled-components";

interface CarouselInnerProps {
  offset: number;
}

export const Container = styled.div`
display:flex;
flex-direction: column
width: 100%;
`;

export const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 448px;
  gap: 16px;
`;

export const CarouselInner = styled.div<CarouselInnerProps>`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: ${(offset: any) => `translateX(-${offset}px)`};
`;
