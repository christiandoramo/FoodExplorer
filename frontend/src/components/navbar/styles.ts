import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: relative;
  margin-bottom: 22px;
  @media (min-width: 769px) {
    padding: 28px 50px;
    gap: 10px;
    margin-bottom: 58px;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 500px;
  border-radius: 5px;
  gap: 20px;
  padding: 0 5px 0 5px;

  @media (max-width: 768px) {
    width: 100%; /* Ajuste para dispositivos móveis */
    margin: 0 auto; /* Centraliza a barra de busca */
  }

  @media (max-width: 1024px) and (orientation: "landscape") {
    width: 100%; /* Ajuste para dispositivos móveis */
    margin: 0 auto; /* Centraliza a barra de busca */
  }
`;

export const SearchInput = styled.input<{ expanded: boolean }>`
  background-color: transparent;
  border: none;
  outline: none;
  width: ${({ expanded }) => (expanded ? "calc(100% - 80px)" : "254px")};
  transition: width 0.66s ease-in-out;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    600px /* Largura total em dispositivos móveis */
  }
  @media (max-width: 1024px) and (orientation: "landscape") {
    width: 100%; /* Largura total em dispositivos móveis */
  }
`;

export const OrdersButton = styled.button`
  height: 40px;
  width: 120px;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  &:hover {
    color: orange;
    background-color: transparent;
    border: 1px white solid;
  }

  @media (max-width: 768px) {
    width: 100%; /* Largura total em dispositivos móveis */
  }
  @media (max-width: 1024px) and (orientation: "landscape") {
    width: 100%; /* Largura total em dispositivos móveis */
  }
`;

// Favorites e historico de pedidos
export const NoBackgroundButton = styled.button`
  height: 40px;
  width: 145px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  transition: width 0.66s ease-in-out;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  &:hover {
    color: orange;
  }
  @media (max-width: 768px) {
    width: 100%; /* Largura total em dispositivos móveis */
  }
  @media (max-width: 1024px) and (orientation: "landscape") {
    width: 100%; /* Largura total em dispositivos móveis */
  }
`;

export const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 20px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.66s ease;
`;

export const Menu = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.66s forwards;
  height: 100%;
`;

export const IconButton = styled.button<{ isOpen: boolean }>`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: transform 0.66s ease;

  // Aplicando a animação de rotação
  animation: ${({ isOpen }) => (isOpen ? rotate : "none")} 0.66s forwards;

  @media (min-width: 769px) {
    display: none;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;
