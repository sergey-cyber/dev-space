import { postService } from "@/service/post/postService";
import { Post } from "@/ui/components/post";
import { Views, ViewsIncrementer } from "@/ui/components/post/views";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await postService.get(params.id, {
    include: { author: true },
  });

  if (!post) {
    return notFound();
  }

  return (
    <Post
      post={post}
      views={<ViewsIncrementer postId={post.id}>{Views}</ViewsIncrementer>}
    />
  );
}
