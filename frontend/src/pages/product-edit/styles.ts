import styled from "styled-components";

export const Container = styled.div`
  width: 100dvw;
  height: auto;
  min-height: 100dvh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const PageLabelContainer = styled.div`
  padding-left: 122px;
  display: flex;
  flex-direction: column;
  width: 100%;

  h1 {
    text-align: left;
    padding: 32px 0;
  }

  justify-content: flex-start;
  gap: 20px;
  align-items: start;
  @media (max-width: 768px) {
    background-color: transparent !important;
    h1 {
      display: none;
    }
    margin: 0;
    padding: 25px 50px;
    width: 100%;
    border: none;
  }
`;
export const EditContainer = styled.div`
  padding: 58px 122px;
  gap: 32px;
  border-radius: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
  div:nth-child(1) {
    justify-content: start;
    align-items: flex-start;
    display: flex;
    width: 100%;
    flex-shrink: 0;
    img {
      max-height: 150px;
      object-fit: cover;
      border-radius: 10px;
    }
  }
  @media (max-width: 768px) {
    background-color: transparent !important;
    h1 {
      display: none;
    }
    margin: 0;
    padding: 25px 50px;
    width: 100%;
    gap: 40px;
    border: none;

    div:nth-child(1) {
      justify-content: center;
      align-items: center;
    }
  }
`;

export const EditNewDishButton = styled.button`
  width: 285px;
  height: 48px;
  border-radius: 5px;
  padding: 12px;
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

export const DeleteButton = styled.button`
  padding: 12px;
  height: 48px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
    border: 2px solid red;
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

export const SubmitContainer = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 1024px) and (orientation: "landscape") {
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
