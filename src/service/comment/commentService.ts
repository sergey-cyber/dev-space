import { Prisma, PrismaClient } from "@prisma/client";
import _prismaClient from "../prisma/prisma-client";

export class CommentService {
  private readonly client;
  constructor(client: PrismaClient) {
    this.client = client;
  }

  public async search<T extends Prisma.CommentInclude>(
    params?: Omit<Prisma.CommentFindManyArgs, "include"> & { include: T },
  ) {
    return this.client.comment.findMany(params);
  }
}

export const commentService = new CommentService(_prismaClient);
