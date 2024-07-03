import styled from "styled-components";

export const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

export const CreateContainer = styled.div`
  padding: 116px 122px;
  gap: 32px;
  border-radius: 16px;
  flex-direction: column;
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
export const CreateNewDishButton = styled.button`
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
