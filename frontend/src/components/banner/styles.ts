import styled from "styled-components";

export const Container = styled.div`
  width: 1120px;
  display: flex;
  padding: 88px 100px 88px 0;
  gap: 32px;
  justify-content: flex-end;
  align-items: center;
  height: 160px;
  position: relative;
`;

export const Image = styled.img`
  position: absolute;
  bottom: 0;
  left: -50px;
  height: 240px;
  background-size: cover;
  //   @media (max-height: 768px) {
  //   width: 100%;
  // }
`;
