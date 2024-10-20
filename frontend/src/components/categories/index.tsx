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
      if (location?.state?.products) {
        setProducts(location?.state?.products);
        return;
      }
      const response: Product[][] = await productService.getProductsCategorized(
        {
          limit: 100,
          offset: 0,
        }
      );
      if (response?.length) {
        location.state = {
          products: response,
        };
        setProducts(response);
      }

      if (!!isLoading) {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    }
    getProductsCategorized();
  }, []);

  useEffect(() => {
    const loadProducts = () => {
      if (!!location?.state?.products) {
        setIsLoading(true);
        setProducts(location?.state?.products);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };
    loadProducts();
  }, [location.state]);

  return (
    <Container>
      {isLoading ? (
        <>
          {matrixPlaceholder.map((arrayOfMatrixPlaceholder) => (
            <>
              <Skeleton
                height={58}
                className="skeleton category"
                variant="text"
                sx={{ bgcolor: getRandomColor() }}
              />
              <div style={{ display: "flex", gap: "10px", flexWrap: "nowrap" }}>
                {arrayOfMatrixPlaceholder.map(() => (
                  <Skeleton
                    className="skeleton items"
                    sx={{ bgcolor: getRandomColor() }}
                    variant="rectangular"
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
