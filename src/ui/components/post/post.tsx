import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/ui/shadcn/ui/card";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ReactNode, Suspense } from "react";
import { UserAvatar } from "../shared/user-avatar";
import { UICodeBlock } from "./code-block";
import { Prisma } from "@prisma/client";
import { Comments, CommentsLoading } from "./comment";
import { Separator } from "@/ui/shadcn/ui/separator";

interface Props {
  post: Prisma.PostGetPayload<{ include: { author: true } }>;
  views?: ReactNode;
}

export function Post({ post, views }: Props) {
  const formatter = new Intl.DateTimeFormat("ru", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription className="flex justify-between  items-center flex-nowrap">
          <span className="flex gap-x-1 items-center flex-nowrap">
            <UserAvatar user={post.author} className="size-8" />
            <span className="text-primary text-lg">{post.author.name}</span>
          </span>
          <span>{formatter.format(new Date(post.createdAt))}</span>
        </CardDescription>
        <CardTitle className="py-2 text-4xl font-extrabold">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert ">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <UICodeBlock
                  language={match[1]}
                  code={String(children).replace(/\n$/, "")}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.content}
        </Markdown>
      </CardContent>
      <CardFooter className="flex justify-end gap-x-2">{views}</CardFooter>

      <Separator className="my-4" />
      <Suspense fallback={<CommentsLoading />}>
        <Comments post={post} />
      </Suspense>
    </Card>
  );
}
