import { Badge } from "@/ui/shadcn/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  post: Prisma.PostGetPayload<{ include: { author: true } }>;
  toPost: string;
  actionsMenu?: ReactNode;
}

export function PostListItem({ post, toPost, actionsMenu }: Props) {
  const formatter = new Intl.DateTimeFormat("ru", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex gap-x-3 justify-between  items-center flex-nowrap">
          <span className="flex gap-x-1 items-center flex-nowrap">
            {/* <UserAvatar user={post.author} className="size-5" /> */}
            <span className="text-primary font-medium">{post.author.name}</span>
          </span>
          <span className="flex space-x-2">
            <span>{formatter.format(new Date(post.createdAt))}</span>
            {actionsMenu}
          </span>
        </CardDescription>
        <CardTitle className="py-2">
          <Link href={toPost}>{post.title}</Link>
        </CardTitle>
        {post.tags.length ? (
          <div className="flex gap-x-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </CardHeader>
    </Card>
  );
}
