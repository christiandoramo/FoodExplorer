import styled from "styled-components";

export const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;
export const LoginContainer = styled.div`
  width: 476px;
  height: 540px;
  border-radius: 16px;
  margin-right: 108px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex-direction: column;
  h1 {
    text-align: center;
    padding: 32px;
  }
  p {
    cursor: pointer;
    &:hover {
      color: orange;
    }
  }
  @media (max-width: 768px) {
    background-color: transparent !important;
    h1 {
      display: none;
    }
    margin: 0;
    padding: 0 50px;
    width: 100%;
    gap: 40px;
    border: none;
  }
`;
export const LogoContainer = styled.div`
  margin-left: 154px;
  @media (max-width: 768px) {
    justify-content: center;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0;
  }
`;
export const LoginButton = styled.button`
  width: 285px;
  height: 48px;
  border-radius: 5px;
  @media (max-width: 768px) {
    justify-content: center;
    display: flex;
    align-items: center;
    width: 100%;
    margin: 0;
  }
`;
