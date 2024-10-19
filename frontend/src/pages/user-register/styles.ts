import styled from "styled-components";

export const Container = styled.div`
  width: 100dvw;
  height: auto;
  min-height: 100dvh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }

  @media (max-width: 1024px) and (orientation: landscape) {
    flex-direction: column;
    justify-content: center;
    height: auto;
  }
`;
export const RegisterContainer = styled.div`
  width: 476px;
  height: 540px;
  border-radius: 16px;
  margin-right: 108px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-direction: column;

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
    gap: 32px;
    border: none;
  }

  @media (max-width: 1024px) and (orientation: landscape) {
    width: 80%;
    height: auto;
    margin-right: 0;
    padding: 0;
  }

  @media (max-height: 500px) and (orientation: landscape) {
    width: 90%;
    height: auto;
    margin-right: 0;
    padding: 0;
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

  @media (max-width: 1024px) and (orientation: landscape) {
    justify-content: center;
    display: flex;
    align-items: center;
    margin-left: 0;
    margin-bottom: 20px; /* Adiciona espaço entre o logo e o campo de login */
  }
`;
export const RegisterAccountButton = styled.button`
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

  @media (max-width: 1024px) and (orientation: landscape) {
    width: 80%;
  }

  @media (max-height: 500px) and (orientation: landscape) {
    width: 90%;
  }
`;
