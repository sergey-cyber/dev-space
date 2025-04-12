import { RouteDef } from "../route-def";
import { profileRoute } from "./self-route";

export const myAccountRoute: RouteDef = {
  getPath: () => profileRoute.getPath() + "/account",
};
