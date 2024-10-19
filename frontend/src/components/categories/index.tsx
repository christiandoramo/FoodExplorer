import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import { Product } from "../../interfaces/product";
import { productService } from "../../services/products";
import { Row } from "./row";
import { useAuth } from "../../contexts/auth";
import { Skeleton } from "@mui/material";
import { getRandomColor } from "../../utils/randomics";
import { useLocation } from "react-router-dom";

export const Categories: React.FC<any> = () => {
  const location = useLocation();

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
      if (location?.state?.searchTerm && location?.state?.products) {
        setProducts(location?.state?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        return;
      }
      const response: Product[][] = await productService.getProductsCategorized(
        {
          limit: 100,
          offset: 0,
        }
      );
      if (response) {
        location.state = {
          products: response,
          searchTerm: "",
        };
        setProducts(response);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    }
    getProductsCategorized();
  }, [location.state]);

  return (
    <Container>
      {isLoading ? (
        <>
          {matrixPlaceholder.map((arrayOfMatrixPlaceholder) => (
            <>
              <Skeleton
                height={58}
                className="text-light-100"
                variant="text"
                width="20%"
                sx={{ bgcolor: getRandomColor() }}
              />
              <div style={{ display: "flex", gap: "10px", flexWrap: "nowrap" }}>
                {arrayOfMatrixPlaceholder.map(() => (
                  <Skeleton
                    sx={{ bgcolor: getRandomColor() }}
                    variant="rectangular"
                    height={462}
                    width={304}
                  />
                ))}
              </div>
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
