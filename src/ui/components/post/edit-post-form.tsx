"use client";

import { Post } from "@prisma/client";
import { PostForm } from "./post-form";
import { useState } from "react";
import { useToast } from "@/ui/lib/hooks/use-toast";
import { updatePost } from "@/server-actions/post/actions";
import { formSchema } from "@/entity/post/schema/post-form-schema";
import { z } from "zod";

interface IProps {
  post: Post;
}

export function EditPostForm({ post }: IProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const result = await updatePost(post.id, values);
      if (result?.error) {
        toast({
          variant: "destructive",
          title: result?.error.message,
        });
        return;
      }
      toast({
        title: "Пост сохранен успешно.",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return <PostForm initialValue={post} onSubmit={onSubmit} loading={loading} />;
}
