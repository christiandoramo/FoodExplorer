import { Hexagon } from "@phosphor-icons/react";
import { USER_ROLES } from "../../enums/users";
import { LogoContainer } from "./styles";

export const Logo: React.FC<any> = ({
  user,
  isLp, // Lp = lading page (ou página de login/criar conta)
}: {
  user?: User;
  isLp?: boolean;
}) => {
  return (
    <LogoContainer>
      <div className="logo-image">
        <Hexagon
          weight="fill"
          size={!!isLp ? 43 : 30}
          className="text-tints-cake-100"
        />
      </div>
      <div className="logo-text">
        {!!isLp ? (
          <div
            className="roboto bigger-bold text-light-100"
            style={{ fontSize: "37px" }}
          >
            food explorer
          </div>
        ) : (
          <>
            <div className="roboto bigger-bold text-light-100">
              food explorer
            </div>
            {user?.role === USER_ROLES.ADMIN && (
              <div className="roboto smallest-regular text-tints-cake-200 admin">
                admin
              </div>
            )}
          </>
        )}
      </div>
    </LogoContainer>
  );
};
