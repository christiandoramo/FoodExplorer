import styled from "styled-components";

export const Container = styled.div`
  align-self: flex-start;
  &:hover svg,
  &:hover div {
    cursor: pointer;
    color: orange; /* Cor laranja ao passar o mouse */
  }
  display: flex;
  gap: 10px;
`;
