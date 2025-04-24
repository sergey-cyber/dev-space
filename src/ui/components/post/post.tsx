import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/ui/shadcn/ui/card";
import Markdown, { ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ClassAttributes,
  HTMLAttributes,
  ReactNode,
  Suspense,
  useCallback,
} from "react";
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

  const code = useCallback(
    (
      props: ClassAttributes<HTMLElement> &
        HTMLAttributes<HTMLElement> &
        ExtraProps,
    ) => {
      const { children, className, node, ...rest } = props;
      const match = /language-(\w+)/.exec(className ?? "");
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
    [],
  );

  return (
    <Card className="w-full" data-test="post">
      <CardHeader>
        <CardDescription className="flex justify-between  items-center flex-nowrap">
          <span className="flex gap-x-1 items-center flex-nowrap">
            <UserAvatar user={post.author} className="size-8" />
            <span className="text-primary text-lg" data-test="author-name">
              {post.author.name}
            </span>
          </span>
          <span data-test="created-at">
            {formatter.format(new Date(post.createdAt))}
          </span>
        </CardDescription>
        <CardTitle className="py-2 text-4xl font-extrabold" data-test="title">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="prose dark:prose-invert " data-test="content">
        <Markdown remarkPlugins={[remarkGfm]} components={{ code }}>
          {post.content}
        </Markdown>
      </CardContent>
      <CardFooter className="flex justify-end gap-x-2" data-test="views">
        {views}
      </CardFooter>

      <Separator className="my-4" />
      <Suspense fallback={<CommentsLoading />}>
        <Comments post={post} />
      </Suspense>
    </Card>
  );
}
