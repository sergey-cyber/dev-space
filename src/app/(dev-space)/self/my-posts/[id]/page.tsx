import { postService } from "@/service/post/postService";
import { Post } from "@/ui/components/post";
import { Views } from "@/ui/components/post/views";

export default async function MyPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await postService.get(params.id, {
    include: { author: true },
  });

  if (!post) {
    // TODO: 404
    return null;
  }

  return <Post post={post} views={<Views views={post.views} />} />;
}
