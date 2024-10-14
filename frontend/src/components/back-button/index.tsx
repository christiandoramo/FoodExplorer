import React from "react";
import { Container } from "./styles";
import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export const BackButton: React.FC<any> = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container onClick={handleGoBack}>
      <CaretLeft className="text-light-100" size={24} />
      <div className="text-light-100">voltar</div>
    </Container>
  );
};
