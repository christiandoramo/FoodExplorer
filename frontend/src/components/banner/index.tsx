import React from "react";
import { Container, Image } from "./styles";

export const Banner: React.FC<any> = () => {
  return (
    <Container className="bg-gradient-200">
      <Image src={"./banner.png"} alt={"banner"} />
      <div style={{ zIndex: 1 }} className="logo-text">
        <div className="text-light-300 medium-500 titletext">
          Sabores inigualáveis
        </div>
        <div className="roboto text-light-300 small-regular subtext">
          Sinta o cuidado do preparo com ingredientes selecionados
        </div>
      </div>
    </Container>
  );
};
