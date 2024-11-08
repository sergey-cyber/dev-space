import { postService } from "@/service/post/postService";
import { EditPostForm } from "@/ui/components/post";

export default async function EditMyPostPage({
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

  return <EditPostForm post={post} />;
}
