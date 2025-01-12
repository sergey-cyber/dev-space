"use client";

import { myPostEditRoute } from "@/routes/self/post";
import { deleteSelfPost } from "@/server-actions/post/actions";
import { useToast } from "@/ui/lib/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/shadcn/ui/dropdown-menu";
import { Post } from "@prisma/client";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { Confirm } from "../../shared/confirm";

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
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { toast } = useToast();

  async function deletePost() {
    setLoading(true);
    try {
      const result = await deleteSelfPost(post.id);
      if (result?.error) {
        toast({
          variant: "destructive",
          title: result?.error.message,
        });
        return;
      }
      toast({
        title: "Пост удален успешно.",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  }

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
      onClick: () => setConfirmOpen(true),
    },
  ];

  return (
    <>
      <Confirm
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={deletePost}
        confirmPaending={loading}
        title="Внимание!"
        description="Пост будет удален, продолжить?"
      />
      <DropdownMenu modal={false}>
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
    </>
  );
}
