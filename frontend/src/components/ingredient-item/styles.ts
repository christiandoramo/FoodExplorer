import styled from "styled-components";

interface TagContainerProps {
  isnew: boolean;
}

export const Container = styled.div<TagContainerProps>`
  display: flex;
  align-items: center;
  height: 32px;
  justify-content: space-between;
  flex: 0 0 0; // grow shrink e base
  width: auto;
  max-width: 100%;

  background-color: ${({ isnew }: { isnew: boolean }) =>
    isnew ? "transparent" : "#76797b"};
  color: ${({ isnew }) => (isnew ? "white" : "#7c7c8a")};
  padding: 8px 32px 8px 16px;
  border-radius: 8px;
  border: ${({ isnew }) => (isnew ? "dashed rgba(124,124,138,1)" : "none")};

  > button {
    border: none;
    background: none;
    cursor: pointer;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-delete {
    height: 100%;
  }

  .button-add {
    height: 100%;
  }

  > input {
    padding: 0;
    margin: 0;
    color: white;
    background: transparent;
    height: 100%;
    border: none;
    max-width: 100px;

    &::placeholder {
      color: gray;
    }
  }

  @media (max-width: 768px) {
    > input {
      max-width: 84px;
    }
  }
  width: 100%;
  @media (max-width: 1024px) and (orientation: landscape) {
    width: 100%;
  }
`;
