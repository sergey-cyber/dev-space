import { postsRoute } from "./posts-route";

type Params = {
  id: string;
};

export const postRoute = {
  getPath: ({ id }: Params) => postsRoute.getPath() + `/${id}`,
};
