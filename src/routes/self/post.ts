import { RouteDef } from "../route-def";
import { profileRoute } from "./self-route";

export const myPostsRoute: RouteDef = {
  getPath: () => profileRoute.getPath() + "/my-posts",
};

export const myPostRoute = {
  getPath: (params: { id: string }) => myPostsRoute.getPath() + `/${params.id}`,
};

export const createPostRoute: RouteDef = {
  getPath: () => myPostsRoute.getPath() + "/create",
};

export const myPostEditRoute = {
  getPath: (params: { id: string }) => myPostRoute.getPath(params) + "/edit",
};
