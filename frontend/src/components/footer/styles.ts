import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 28px 10%;
  justify-content: space-between;
  align-items: center;
  height: 60px;

  .logo-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    // gap: 0;
  }

  @media (max-width: 1024px) and (orientation: landscape) {
  }

  @media (max-width: 1024px) {
    justify-content: center;
    .logo-footer {
      justify-content: center;
      padding: 0;
    }
    padding: 0;
    gap: 0;
  }
`;
