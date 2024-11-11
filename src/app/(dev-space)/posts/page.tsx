import { postRoute } from "@/routes/post/post-route";
import { postService } from "@/service/post/postService";
import { PostListItem, PostsPagination } from "@/ui/components/post";
import { EmptyList } from "@/ui/components/shared/empty-list";

interface Props {
  searchParams: { page?: string };
}

const POSTS_PER_PAGE = 10;

export default async function PostsPage({ searchParams }: Props) {
  const currentPage = Number(searchParams?.page) || 1;
  const postsCount = await postService.getCount();
  const posts = await postService.search({
    include: { author: true },
    skip: (currentPage - 1) * POSTS_PER_PAGE,
    take: POSTS_PER_PAGE,
  });

  const totalPages = Math.ceil(postsCount / POSTS_PER_PAGE);

  if (!postsCount) {
    return <EmptyList />;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostListItem
          post={post}
          key={post.id}
          toPost={postRoute.getPath({ id: post.id })}
        />
      ))}
      <PostsPagination totalPages={totalPages} />
    </div>
  );
}
