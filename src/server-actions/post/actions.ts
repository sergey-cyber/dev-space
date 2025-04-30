"use server";

import { CreatePostPayload } from "@/entity/post/post";
import { ServerActionExeption } from "@/exeption/server-action-exeption";
import { myPostsRoute } from "@/routes/self/post";
import { authService } from "@/service/auth/authService";
import { logger } from "@/service/logger";
import { postService } from "@/service/post/postService";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(payload: CreatePostPayload) {
  let principal;
  try {
    principal = await authService.getPrincipalStricktly();
    const createdPost = await postService.createPost({
      ...payload,
      authorId: principal.id,
    });
    logger.info(
      `Post created successfull. Post: ${createdPost.id}.Created by user: '${principal?.id}'.`,
    );
  } catch (err: any) {
    logger.error(
      `Error creating post. User: '${principal?.id ?? "unknown"}'. Error message: ${err?.message ?? "unknown"}.`,
    );
    return new ServerActionExeption(
      "Ошибка при создании поста.",
      err?.status ?? undefined,
    ).asPlainObject();
  }

  const redirectPath = myPostsRoute.getPath();
  revalidatePath(redirectPath);
  redirect(redirectPath);
}

export async function updateSelfPost(postId: string, payload: Partial<Post>) {
  try {
    const principal = await authService.getPrincipalStricktly();
    const post = await postService.get(postId, { include: { author: true } });
    if (principal.id !== post?.author.id) {
      logger.error(
        `Error updating post. Access denied. User: '${principal?.id ?? "unknown"}'. Post: '${post?.id ?? "unknown"}'.`,
      );
      return new ServerActionExeption(
        "Нет прав на редактирование данного поста.",
      ).asPlainObject();
    }
    const updatedPost = await postService.updatePost(postId, payload);
    logger.info(
      `Post updated successfull. Post: ${updatedPost.id}. Updated by user: '${principal?.id}'.`,
    );
  } catch (err: any) {
    logger.error(
      `Error updating post. Error message: ${err?.message ?? "unknown"}.`,
    );
    return new ServerActionExeption(
      "Ошибка при обновлении поста.",
      err?.status ?? undefined,
    ).asPlainObject();
  }
  const redirectPath = myPostsRoute.getPath();
  revalidatePath(redirectPath);
  redirect(redirectPath);
}

export async function deleteSelfPost(
  postId: string,
  options?: { redirectToList?: boolean },
) {
  try {
    const principal = await authService.getPrincipalStricktly();
    const post = await postService.get(postId, { include: { author: true } });
    if (principal.id !== post?.author.id) {
      logger.error(
        `Error deleting post. Access denied. User: '${principal?.id ?? "unknown"}'. Post: '${post?.id ?? "unknown"}'.`,
      );
      return new ServerActionExeption(
        "Нет прав на удаление данного поста.",
      ).asPlainObject();
    }
    const deletedPost = await postService.deletePost(postId);
    logger.info(
      `Post deleted successfull. Post: ${deletedPost.id}. Deleted by user: '${principal?.id}'.`,
    );
  } catch (err: any) {
    logger.error(
      `Error deleting post. Error message: ${err?.message ?? "unknown"}.`,
    );
    return new ServerActionExeption(
      "Ошибка при удалении поста.",
      err?.status ?? undefined,
    ).asPlainObject();
  }
  const redirectPath = myPostsRoute.getPath();
  revalidatePath(redirectPath);
  if (options?.redirectToList) {
    redirect(redirectPath);
  }
}

export async function incrementViews(id: string) {
  let post;
  try {
    post = await postService.incrmentViews(id);
    return post.views;
  } catch (e: any) {
    logger.error(
      `Error incrementing post views. Post '${post?.id ?? "unknown"}'. Error message: ${e?.message ?? "unknown"}.`,
    );
  }
}
