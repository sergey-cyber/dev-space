import { Roles } from "@/entity/role/roles";
import { Alert, AlertDescription, AlertTitle } from "@/ui/shadcn/ui/alert";
import { AddPostButton } from "./add-post-button";
import { TriangleAlert } from "lucide-react";

interface Props {
  userRole?: string;
}

export function PostsSectionHeader({ userRole }: Props) {
  const hasAccessToCreatePost =
    userRole === Roles.ADMIN || userRole === Roles.AUTHOR;

  if (!hasAccessToCreatePost) {
    return (
      <Alert data-test="no-access-alert">
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Внимание!</AlertTitle>
        <AlertDescription>
          У вас недостаточно прав для публикации постов. Если вы хотите стать
          автором, обратитесь в поддержку.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex justify-end">
      <AddPostButton />
    </div>
  );
}
