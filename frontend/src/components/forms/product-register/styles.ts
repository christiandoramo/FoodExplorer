import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 768px) {
    width: 100%;
  }
  .upload-label {
    width: 229px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
  }

  @media (max-width: 768px) {
    .upload-label {
      width: 100%;
    }
  }
`;

export const StringInputElement = styled.input`
  padding: 12px;
  border-color: rgba(124, 124, 138, 1);
  border-radius: 5px;
  text-align: left;
  width: 463px;
  height: 48px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ValueInputElement = styled.input`
  padding: 12px;
  border-color: rgba(124, 124, 138, 1);
  border-radius: 5px;
  text-align: left;
  height: 48px;
  width: 251px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SelectInputElement = styled.select`
  padding: 12px;
  padding-right: 40px;
  border-color: rgba(124, 124, 138, 1);
  border-radius: 5px;
  text-align: left;
  width: 363px;
  height: 48px;
  appearance: none;
  background: url("chevron-down.svg") no-repeat right 10px center
    rgba(13, 29, 37, 1);
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

export const TextAreaInputElement = styled.textarea`
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
  border-radius: 5px;
  text-align: center;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    height: 100%;
  }
  div:nth-child(2) {
    padding-left: 20px;
    width: 20%;
  }
  div:nth-child(3) {
    text-align: left;
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    border-color: #fff;
    color: #fff;
  }
`;

export const IngredientsInputContainer = styled.div`
  width: 819px;
  padding: 4px;
  display: flex;
  flex-wrap: wrap;
  min-height: 40px;
  align-items: center;
  gap: 4px 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 1024px) and (orientation: landscape) {
    width: 100%;
  }
`;
