import styled from "styled-components";

export const Container = styled.div`
  width: 80%; /* Ocupar a largura total da tela */
  padding: 88px 100px 88px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center

  height: 100px;
  position: relative;

  @media (max-width: 768px) {
    gap: 0;
    padding: 48px 20px; /* Reduzir padding em telas menores */
    align-items: center;
    height: 120px;

    div:nth-child(2) {
    padding-left:10px;
      font-size: 7px;
      width: 140px;
      padding-right: 1px;
    }
    div:nth-child(1) {
      padding-left:10px;
      font-size: 10px;
      width: 150px;
    }
  }

  @media (max-width: 1024px) and (orientation: landscape) {
    padding: 48px 20px; /* Reduzir padding em telas menores */
    // flex-direction: column; /* Coloca o texto abaixo da imagem no mobile */
    align-items: center;
    height: 120px;
    div:nth-child(2) {
      font-size: 12px;
      width: 200px;
    }
    div:nth-child(1) {
      font-size: 16px;
      width: 200px;
    }
  }
`;

export const Image = styled.img`
  position: absolute;
  left: 10px;
  height: 270px;
  object-fit: contain;
  bottom: 0;

  @media (max-width: 768px) {
    left: 25px;
    bottom: 0px;
    position: relative;
    height: 120px;
    max-width: 100%; /* O banner ocupa a largura disponível */

    max-height: 180px; /* Ajustar a altura em telas menores */
  }

  @media (max-width: 1024px) and (orientation: landscape) {
    left: -50px;
    bottom: 15px;
    position: relative;
    height: 150px;
    max-width: 100%; /* O banner ocupa a largura disponível */
    max-height: 160px; /* Ajuste para mobile horizontal */
  }
`;
