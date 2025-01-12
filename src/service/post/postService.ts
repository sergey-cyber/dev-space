import { Post, Prisma } from "@prisma/client";
import _prismaClient from "@/service/prisma/prisma-client";
import { IServiceClient } from "../client/IClient";
import { Roles } from "@/entity/role/roles";
import { Access } from "../../lib/auth/access";

export class PostService {
  private client;
  constructor(client: IServiceClient) {
    this.client = client;
  }

  public async get<T extends Prisma.PostInclude>(
    id: string,
    args: { include: T },
  ) {
    return this.client.post.findUnique({ where: { id }, ...args });
  }

  public async search<T extends Prisma.PostInclude>(
    params?: Omit<Prisma.PostFindManyArgs, "include"> & { include: T },
  ) {
    return this.client.post.findMany(params);
  }

  public async getCount(params?: Prisma.PostCountArgs) {
    return this.client.post.count(params);
  }

  @Access([Roles.ADMIN, Roles.AUTHOR])
  public async createPost(post: Pick<Post, "title" | "authorId" | "content">) {
    return this.client.post.create({ data: post });
  }

  @Access([Roles.ADMIN, Roles.AUTHOR])
  public async updatePost(id: string, post: Partial<Post>) {
    return this.client.post.update({ where: { id }, data: post });
  }

  public async incrmentViews(id: string) {
    return this.client.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }

  @Access([Roles.ADMIN, Roles.AUTHOR])
  public async deletePost(id: string) {
    return this.client.post.delete({ where: { id } });
  }
}

export const postService = new PostService(_prismaClient);
