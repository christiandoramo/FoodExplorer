import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100dvh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 32px;

  .ingredient-container {
    display: flex;
    flex-direction: row;
    gap: 12px;
    width: 100%;
    flex-wrap: wrap;
  }
  .ingredient {
    padding: 4px 8px;
  }

  .back-button-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding-left: 10%;
  }
  .include-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
  }

  .include-container h3 {
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .ingredient-container {
      justify-content: center;
      align-items: center;
    }
    .ingredient {
      padding: 4px 8px;
    }
  }
  @media (max-width: 1024px) and (orientation: landscape) {
    .ingredient-container {
      justify-content: center;
      align-items: center;
    }
    .ingredient {
      padding: 4px 8px;
    }
  }
`;

export const ProductImage = styled.div`
  width: 390px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    // height: auto; /* Mantém a proporção da imagem */
    object-fit: contain; /* Garante que a imagem fique contida e não seja distorcida */
    text-align: center;
  }

  @media (max-width: 1024px) and (orientation: landscape) {
    width: 265px;
    margin: 0 auto;
    img {
      width: 100%;
      margin: 0 auto;
    }
  }

  @media (max-width: 768px) {
    width: 265px;
    margin: 0 auto;
    img {
      width: 100%;
      margin: 0 auto;
    }
  }
`;
export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  height: auto;
  gap: 56px;
  h1 {
  }
  p {
  }

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1024px) and (orientation: landscape) {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

export const InfoContainer = styled.div`
  margin-top: 50px;
  padding: 0 122px 58px;
  gap: 32px;
  border-radius: 16px;
  height: auto;

  display: flex;

  h1 {
    text-align: center;
    padding: 0 32px;
  }
  p {
    cursor: pointer;
    &:hover {
      color: orange;
    }
  }
  @media (max-width: 768px) {
    background-color: transparent !important;
    h1 {
      display: none;
    }
    margin: 0;
    padding: 0 50px;
    width: 100%;
    gap: 40px;
    border: none;
    flex-direction: column;
  }

  @media (max-width: 1024px) and (orientation: landscape) {
    background-color: transparent !important;
    h1 {
      display: none;
    }
    margin: 0;
    padding: 0 50px;
    width: 100%;
    gap: 40px;
    border: none;
    flex-direction: column;
  }
`;

export const LogoContainer = styled.div`
  margin-left: 154px;
  @media (max-width: 768px) {
    justify-content: center;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0;
  }
`;

export const InteractionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const InteractionButton = styled.button`
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
  @media (max-width: 768px) {
    justify-content: center;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0;
  }
`;

export const IngredientContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
