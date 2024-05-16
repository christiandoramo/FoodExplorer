import { UnsignedRoutes } from "./unsigned.routes";
import { AdminRoutes } from "./admin.routes";
import { SignedRoutes } from "./signed.routes";

import { useAuth } from "../contexts/auth.tsx";

import { USER_ROLES } from "../enums/users";

export const AppRoutes = () => {
  const user = useAuth()?.user;
  if (user) {
    if (user.role === USER_ROLES.DEFAULT) {
      return <SignedRoutes />;
    } else if (user.role === USER_ROLES.ADMIN) {
      return <AdminRoutes />;
    }
  }
  return <UnsignedRoutes />;
};
