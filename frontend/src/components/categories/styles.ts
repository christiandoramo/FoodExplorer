import styled from "styled-components";

export const Container = styled.div`
  width: 1120px;
  display: flex;
  gap: 32px;
  justify-content: justify-between;
  align-items: start;
  flex-direction: column;
  background-color: transparent !important;
  padding: 58px 0;

  .skeleton.category {
    width: 20%;
    display: flex;
    flex-wrap: nowrap;

    @media (max-width: 768px) {
    }
  }
  .skeleton.items {
    height: 462px;
    width: 304px;
    display: flex;
    flex-wrap: nowrap;

    @media (max-width: 768px) {
    }
  }
`;
