"use server";

import { signOut } from "@/auth";
import { logger } from "@/service/logger";

export async function logOut() {
  try {
    await signOut();
    logger.info(`Sign out successfull.`);
  } catch (err: any) {
    logger.error(`Error sign out. Error message: ${err?.message ?? "unknown"}`);
  }
}
