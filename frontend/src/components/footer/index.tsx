import React from "react";
import { Container } from "./styles";
import { Logo } from "../logo";
import { useMediaQuery } from "react-responsive";

export const Footer: React.FC<any> = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px), (pointer: coarse)",
  });

  return (
    <Container className="bg-dark-600">
      <div className="logo-footer">
        <Logo isMobile={isMobile} />
        <div className="roboto smallest-regular text-tints-cake-200 copyrights-text">
          &copy; {!isMobile && <>Desenvolvido por </>}Christian Oliveira{" "}
          {!isMobile && (
            <>
              (Prototipado por{" "}
              <a
                href="https://www.figma.com/design/kM5KRimd9oRJphYeQkT3xc/food-explorer-v2-(Community)?node-id=96-5219&node-type=canvas&t=xq4YZ4pJyIZsQhAE-0"
                target="blank"
              >
                Rocketseat
              </a>
              )
            </>
          )}
        </div>
      </div>
    </Container>
  );
};
