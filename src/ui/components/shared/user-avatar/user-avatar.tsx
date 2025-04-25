import { Avatar, AvatarFallback, AvatarImage } from "@/ui/shadcn/ui/avatar";
import { User } from "@prisma/client";

interface Props {
  user?: User;
  className?: string;
}

export function UserAvatar({ user, className }: Props) {
  return (
    <Avatar className={className}>
      <AvatarImage src={user?.image ?? undefined} alt="post-author avatar" />
      <AvatarFallback>
        {user?.name ? user.name?.slice(0, 1).toLocaleUpperCase() : "DS"}
      </AvatarFallback>
    </Avatar>
  );
}
