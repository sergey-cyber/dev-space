"use client";

import { incrementViews } from "@/server-actions/post/actions";
import { useFetch } from "@/ui/lib/hooks/use-fetch";
import { ReactNode, useState } from "react";

export function ViewsIncrementer(props: {
  postId: string;
  children: (childProps: { views: number }) => ReactNode;
}) {
  const [views, setViews] = useState(0);

  useFetch(() => incrementViews(props.postId), {
    onSuccess: (res) => setViews(res ?? 0),
    deps: [],
  });

  return <div>{props.children({ views })}</div>;
}
