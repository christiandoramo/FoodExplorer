import styled from "styled-components";

export const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
  min-height: 100dvh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }

  /* Ajuste para telas pequenas em modo paisagem */
  @media (max-width: 1024px) and (orientation: landscape) {
    flex-direction: column; /* Empilhar conteúdo verticalmente */
    justify-content: center; /* Centraliza o conteúdo */
    height: auto;
  }
`;

export const LoginContainer = styled.div`
  width: 476px;
  height: 540px;
  border-radius: 16px;
  margin-right: 108px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex-direction: column;

  h1 {
    text-align: center;
    padding: 32px;
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

  /* Mantém o logo acima do login no mobile horizontal */
  @media (max-width: 1024px) and (orientation: landscape) {
    justify-content: center;
    display: flex;
    align-items: center;
    margin-left: 0;
    margin-bottom: 20px; /* Adiciona espaço entre o logo e o campo de login */
  }
`;

export const LoginButton = styled.button`
  width: 285px;
  height: 48px;
  border-radius: 5px;

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
