import { PostQuery } from "./post";
import { UserQuery } from "./user";

class QueryRegistry {
  public users = new UserQuery();
  public posts = new PostQuery();
}

export const query = new QueryRegistry();
