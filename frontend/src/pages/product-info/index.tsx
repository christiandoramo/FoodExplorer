import React, { useState } from "react";
import {
  Container,
  InfoContainer,
  InteractionButton,
  ProductImage,
  ProductInfoContainer,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { BackButton } from "../../components/back-button";
import { useAuth } from "../../contexts/auth";
import { USER_ROLES } from "../../enums/users";
import { formatToAmount } from "../../utils/strings";

export const ProductInfo: React.FC<any> = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Container className="bg-home">
      <Navbar />
      <InfoContainer>
        <BackButton />
        <InfoContainer>
          <ProductImage />
          <ProductInfoContainer>
            <h2>Nome do Prato</h2>
            <h3>Descrição</h3>
            <h3>Preço</h3>
            <h3>Ingredientes</h3>
            {user.role === USER_ROLES.ADMIN && (
              <InteractionButton>Editar</InteractionButton>
            )}
            {user.role === USER_ROLES.DEFAULT && (
              <InteractionButton>{`Incluir (${formatToAmount(
                productAmount
              )})`}</InteractionButton>
            )}
          </ProductInfoContainer>
        </InfoContainer>
      </InfoContainer>
      <Footer />
    </Container>
  );
};
