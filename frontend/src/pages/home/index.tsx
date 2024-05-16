import React from "react";
import { Container } from "./styles";
import { Navbar } from "../../components/navbar";

export const Home: React.FC<any> = () => {
  return (
    <Container>
      <Navbar />
    </Container>
  );
};
