import styled from "styled-components";

interface CarouselInnerProps {
  offset: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  height: auto;
  gap: 32px;

  .row-container {
    display: flex;
    position: relative;
    width: auto;
    overflow: hidden;
    max-width: 100%;

    // Adicionando o gradiente escurecido nas bordas
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50%; /* Largura do efeito de vinheta */
      z-index: 3;
      pointer-events: none; /* Permite que clique e interação com setas não sejam bloqueados */
    }

    // Gradiente da esquerda
    &::before {
      left: 0;
      background: linear-gradient(
        to right,
        rgba(0, 10, 15, 0.8),
        rgba(0, 10, 15, 0)
      );
    }

    // Gradiente da direita
    &::after {
      right: 0;
      background: linear-gradient(
        to left,
        rgba(0, 10, 15, 0.8),
        rgba(0, 10, 15, 0)
      );
    }
  }

  .arrowLeft {
    position: absolute;
    left: 1%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4; /* Garantir que as setas fiquem acima do gradiente */
  }

  .arrowRight {
    position: absolute;
    right: 1%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4; /* Garantir que as setas fiquem acima do gradiente */
  }
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
  gap: 15px;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-${(props) => props.offset}px);
`;
