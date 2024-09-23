import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import { Product } from "../../interfaces/product";
import { productService } from "../../services/products";
import { Row } from "./row";
import { useAuth } from "../../contexts/auth";
import { Skeleton } from "@mui/material";

export const Categories: React.FC<any> = () => {
  const [products, setProducts] = useState<Product[][]>([]);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const matrixPlaceholder: Number[][] = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ];

  useEffect(() => {
    async function getProductsCategorized() {
      const response: Product[][] = await productService.getProductsCategorized(
        {
          limit: 10,
          offset: 0,
        }
      );
      if (response) {
        setProducts(response);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
    getProductsCategorized();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <>
          {matrixPlaceholder.map((arrayOfMatrixPlaceholder) => (
            <>
              <Skeleton variant="text" width="20%" />
              {arrayOfMatrixPlaceholder.map(() => (
                <Skeleton variant="rectangular" height={462} width={304} />
              ))}
            </>
          ))}
        </>
      ) : (
        products?.length > 0 &&
        products.map((productsByCategory, index) => (
          <Row
            key={index}
            user={user}
            productsByCategory={productsByCategory}
          />
        ))
      )}
    </Container>
  );
};
