import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 28px 123px;
  gap: 32px;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  height: 40px;
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

export const NewDishButton = styled.button`
  height: 40px;
  width: 216px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flexç;
`;
