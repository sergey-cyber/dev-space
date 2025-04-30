"use server";

import { ServerActionExeption } from "@/exeption/server-action-exeption";
import { postsRoute } from "@/routes/post/posts-route";
import { logger } from "@/service/logger";
import { userService } from "@/service/user/userService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteSelf() {
  try {
    await userService.deleteSelf();
    logger.info(`User deleted successfull`);
  } catch (err: any) {
    logger.error(
      `Error deleting user. Error message: ${err?.message ?? "unknown"}`,
    );
    return new ServerActionExeption(
      "Ошибка при удалении аккаунта.",
      err?.status ?? undefined,
    ).asPlainObject();
  }
  const redirectPath = postsRoute.getPath();
  revalidatePath(redirectPath);
  redirect(redirectPath);
}
