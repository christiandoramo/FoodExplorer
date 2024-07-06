import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const StringInputElement = styled.input`
  padding: 12px;
  border-color: rgba(124, 124, 138, 1);
  border-radius: 5px;
  text-align: left;
  width: 463px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TextInputElement = styled.input`
  padding: 12px;
  border-color: rgba(124, 124, 138, 1);
  border-radius: 5px;
  text-align: left;
  width: 1120px;
  height: 172px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const UploadInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  border-radius: 5px;
  text-align: center;
  width: 229px;
  height: 48px;
  cursor: pointer;
  gap: 8px;
  @media (max-width: 768px) {
    width: 100%;
  }
  input {
    display: none;
  }
  &:hover {
    border-color: #fff;
    color: #fff;
  }
`;
