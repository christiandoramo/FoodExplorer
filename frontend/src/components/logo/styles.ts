import styled from "styled-components";

export const LogoContainer = styled.div<{ isMobile?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: ${(isMobile) => (!!isMobile ? "center" : "start")};
  align-items: ${(isMobile) => (!!isMobile ? "center" : "start")};
  flex-direction: row;
  cursor: pointer;
  min-width: 200px;
  .logo-image{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-text {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: end;
}
  }
  .admin {
    margin-top: -7px;
  }
`;
