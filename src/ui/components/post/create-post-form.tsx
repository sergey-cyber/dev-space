"use client";

import { formSchema } from "@/entity/post/schema/post-form-schema";
import { createPost } from "@/server-actions/post/actions";
import { useToast } from "@/ui/lib/hooks/use-toast";
import { useState } from "react";
import { z } from "zod";
import { PostForm } from "./post-form";

export function CreatePostForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const { error } = await createPost(values);
      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
        });
        return;
      }
      toast({
        title: "Пост создан успешно.",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PostForm
      initialValue={{
        title: "",
        tags: [],
        content: "",
      }}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
}
