import { RouteDef } from "../route-def";

export const profileRoute: RouteDef = {
  getPath: () => "/self",
};

export const personalInfoRoute: RouteDef = {
  getPath: () => profileRoute.getPath() + "/personal-info",
};
