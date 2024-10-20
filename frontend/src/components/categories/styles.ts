import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  display: flex;
  gap: 32px;
  justify-content: justify-between;
  align-items: start;
  flex-direction: column;
  background-color: transparent !important;
  padding: 58px 0 58px;

  .skeleton.category {
    width: 20%;
    display: flex;
    flex-wrap: nowrap;

    @media (max-width: 768px) {
    }
  }
  .skeleton.item {
    height: 462px;
    width: 304px;
    display: flex;
    flex-shrink: 0;
  }
  .skeleton.items-container {
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: scroll;
  }

  @media (max-width: 768px) {
  }
`;
