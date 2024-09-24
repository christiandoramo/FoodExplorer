import React from "react";
import { Container, LoginContainer } from "./styles";

export const Error: React.FC<any> = () => {
  return (
    <Container className="bg-dark-400">
      <LoginContainer className="bg-dark-700">
        <h1 className="text-light-100 medium-400">
          404 - Página Não Encontrada
        </h1>
        <p className="text-light-100 small-regular">
          A página que você está procurando não existe.
        </p>
      </LoginContainer>
    </Container>
  );
};
