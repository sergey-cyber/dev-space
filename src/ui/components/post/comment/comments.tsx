import { commentService } from "@/service/comment/commentService";
import { Post } from "@prisma/client";
import { Comment } from "./comment";

interface Props {
  post: Post;
}

export async function Comments({ post }: Props) {
  const comments = await commentService.search({
    where: { postId: post.id },
    include: { user: true },
  });

  return (
    <div className="container space-y-4 py-4">
      <h2 className="text-xl font-bold">{`Комментарии (${comments.length})`}</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
