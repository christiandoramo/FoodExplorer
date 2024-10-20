import styled from "styled-components";

export const Container = styled.div`
  // z-index: 10;
  flex-shrink: 0;
  margin: 0 5px;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: justify-between;
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 462px;
  width: 304px;
  border-radius: 8px;
  gap: 15px;

  .heart {
    transition: all 0.3s ease;
  }
  .heart:hover {
    transform: scale(1.1); /* Aumenta um pouco o tamanho ao passar o mouse */
  }

  .name-container {
    cursor: pointer;
    padding: 0;
    width: 100%;

    display: -webkit-box;

    -webkit-line-clamp: 1; /* Limita a 2 linhas */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
  .description-container {
    word-wrap: break-word;
    padding: 0 10px 0;
    max-width: 80%;
    box-sizing: border-box;

    display: -webkit-box;

    -webkit-line-clamp: 2; /* Limita a 2 linhas */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  .price-container {
    word-wrap: break-word;
    padding: 0 10px 0;
    width: 100%;
    box-sizing: border-box;
  }

  .include-container {
    display: flex;
    justify-content: center;
    gap: 15px;
    align-items: center;
    width: 100%;
  }
`;

export const IncludeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 12px 24px;
`;

export const Thumbnail = styled.img`
  flex-shrink: 0;
  cursor: pointer;
  width: 176px;
`;

export const SecundaryActionComponent = styled.div`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;
