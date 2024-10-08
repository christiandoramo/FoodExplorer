import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 28px 123px;
  gap: 32px;
  justify-content: center;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: start;
  align-items: start;
  flex-direction: row;
  cursor: pointer;

  .logo-text {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: end;
  }
  .admin {
    margin-top: -7px;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 581px;
  border-radius: 5px;
  gap: 20px;
`;

export const SearchInput = styled.input<{ expanded: boolean }>`
  background-color: transparent;
  border: none;
  outline: none;
  width: ${({ expanded }) => (expanded ? "calc(100% - 80px)" : "254px")};
  transition: width 0.3s ease-in-out;
  text-align: left;
`;

export const OrdersButton = styled.button`
  height: 48px;
  width: 216px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flexç;
`;

export const TextInputElement = styled.input`
  padding: 12px;
  border-color: rgba(124, 124, 138, 1);
  border-radius: 5px;
  text-align: left;
  width: 285px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PasswordInputElement = styled.input`
  padding: 12px;
  border-color: rgba(124, 124, 138, 1);
  border-radius: 5px;
  text-align: left;
  width: 285px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
