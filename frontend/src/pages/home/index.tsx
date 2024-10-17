import React from "react";
import { Container } from "./styles";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { Banner } from "../../components/banner";
import { Categories } from "../../components/categories";

export const Home: React.FC<any> = () => {
  return (
    <Container className="bg-gradient-100">
      <Navbar />
      <Banner />
      <Categories />
      <Footer />
    </Container>
  );
};
