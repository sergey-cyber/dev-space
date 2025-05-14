import { createPostRoute } from "@/routes/self/post";
import { buttonVariants } from "@/ui/shadcn/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function AddPostButton() {
  return (
    <Link
      href={createPostRoute.getPath()}
      className={buttonVariants({ variant: "default" })}
      data-test="add-post-button"
    >
      <Plus className="mr-2 h-4 w-4" />
      Добавить
    </Link>
  );
}
