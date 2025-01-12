"use server";

import { CreatePostPayload } from "@/entity/post/post";
import { ServerActionExeption } from "@/exeption/server-action-exeption";
import { myPostsRoute } from "@/routes/self/post";
import { authService } from "@/service/auth/authService";
import { postService } from "@/service/post/postService";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(payload: CreatePostPayload) {
  try {
    const principal = await authService.getPrincipalStricktly();
    await postService.createPost({
      ...payload,
      authorId: principal.id,
    });
  } catch (err: any) {
    return new ServerActionExeption(
      "Ошибка при создании поста.",
      err?.status || undefined,
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
      return new ServerActionExeption(
        "Нет прав на редактирование данного поста.",
      ).asPlainObject();
    }
    await postService.updatePost(postId, payload);
  } catch (err: any) {
    return new ServerActionExeption(
      "Ошибка при обновлении поста.",
      err?.status || undefined,
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
      return new ServerActionExeption(
        "Нет прав на удаление данного поста.",
      ).asPlainObject();
    }
    await postService.deletePost(postId);
  } catch (err: any) {
    return new ServerActionExeption(
      "Ошибка при удалении поста.",
      err?.status || undefined,
    ).asPlainObject();
  }
  const redirectPath = myPostsRoute.getPath();
  revalidatePath(redirectPath);
  if (options?.redirectToList) {
    redirect(redirectPath);
  }
}

export async function incrementViews(id: string) {
  try {
    const post = await postService.incrmentViews(id);
    return post.views;
  } catch (e) {
    console.error(e);
  }
}
