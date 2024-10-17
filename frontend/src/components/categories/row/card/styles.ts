import styled from "styled-components";

export const Container = styled.div`
  flex-shrink: 0;
  margin: 0 5px;
  padding: 20px;
  text-align: center;
  display: flex;

  justify-content: justify-between;
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 462px;
  width: 304px;

  border-radius: 8px;

  .heart {
    transition: all 0.3s ease;
  }
  .heart:hover {
    transform: scale(1.1); /* Aumenta um pouco o tamanho ao passar o mouse */
  }
`;

export const Thumbnail = styled.img`
  flex-shrink: 0;
  cursor: pointer;
  width: 176px;
`;

export const SecundaryActionComponent = styled.div`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;
