import React from "react";
import { Container } from "./styles";

export const Footer: React.FC<any> = () => {
  return (
    <Container className="bg-dark-600">
      <div className="logo-text">
        {/* <div className="roboto bigger-bold text-light-100">food explorer</div> */}
        <p className="roboto smallest-regular text-tints-cake-200 admin">
          &copy; Desenvolvido por Christian Oliveira
        </p>
      </div>
    </Container>
  );
};
