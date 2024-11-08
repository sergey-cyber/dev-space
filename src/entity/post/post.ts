import { Post } from "@prisma/client";

export type CreatePostPayload = Pick<Post, "title" | "content">;
