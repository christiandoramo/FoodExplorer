import React from "react";
import { Container } from "./styles";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { Banner } from "../../components/banner";

export const Home: React.FC<any> = () => {
  return (
    <Container className="bg-home">
      <Navbar />
      <Banner />
      <Footer />
    </Container>
  );
};
