import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100dvh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const ProductImage = styled.img`
  width: 390px;
`;
export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: auto;

  h1 {
  }
  p {
  }
`;

export const InfoContainer = styled.div`
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
  width: 285px;
  height: 48px;
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
