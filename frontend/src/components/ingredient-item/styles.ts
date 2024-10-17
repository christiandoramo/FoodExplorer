import styled from "styled-components";

interface TagContainerProps {
  isnew: boolean;
}

export const Container = styled.div<TagContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  background-color: ${({ isnew }: { isnew: boolean }) =>
    isnew ? "transparent" : "#76797b"};
  color: ${({ isnew }) => (isnew ? "white" : "#7c7c8a")};
  padding: 16px;
  border-radius: 20px;
  border: ${({ isnew }) => (isnew ? "none" : "dashed #7c7c8a")};

  gap: 16px;

  > button {
    border: none;
    background: none;
    cursor: pointer;
  }

  .button-delete {
    color: red;
  }

  .button-add {
    color: gray;
  }

  > input {
    color: white;
    background: transparent;

    border: none;

    &::placeholder {
      color: gray;
    }
  }
`;
