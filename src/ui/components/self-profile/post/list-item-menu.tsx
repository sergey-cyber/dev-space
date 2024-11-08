"use client";

import { myPostEditRoute } from "@/routes/self/post";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/shadcn/ui/dropdown-menu";
import { Post } from "@prisma/client";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export interface ActionMenuItem {
  key: React.Key;
  icon: ReactNode;
  label: ReactNode;
  onClick: () => void;
  danger?: boolean;
}

interface IProps {
  post: Post;
}

export function ListItemMenu({ post }: IProps) {
  const router = useRouter();
  console.log(myPostEditRoute.getPath({ id: post.id }));
  const items: ActionMenuItem[] = [
    {
      key: "edit",
      label: "Редакьтровать",
      icon: <Pencil />,
      onClick: () => router.push(myPostEditRoute.getPath({ id: post.id })),
    },
    {
      key: "remove",
      label: "Удалить",
      icon: <Trash />,
      onClick: () => "",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {items.map(({ icon, label, onClick, key }) => (
          <DropdownMenuItem onClick={onClick} className="gap-x-2" key={key}>
            {icon}
            <span>{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
