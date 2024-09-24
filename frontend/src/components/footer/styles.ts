import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 28px 123px;

  justify-content: center;
  align-items: center;
  height: 50px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;
