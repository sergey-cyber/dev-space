import { myPostRoute } from "@/routes/self/post";
import { authService } from "@/service/auth/authService";
import { postService } from "@/service/post/postService";
import { PostListItem, PostsPagination } from "@/ui/components/post";
import {
  ListItemMenu,
  PostsSectionHeader,
} from "@/ui/components/self-profile/post";
import { EmptyList } from "@/ui/components/shared/empty-list";

interface Props {
  searchParams: { page?: string };
}

const POSTS_PER_PAGE = 10;

export default async function MyPostsPage({ searchParams }: Props) {
  const currentPage = Number(searchParams?.page) || 1;
  const postsCount = await postService.getCount();
  const principal = await authService.getPrincipalStricktly();
  const posts = await postService.search({
    where: { authorId: principal.id },
    include: { author: true },
    skip: (currentPage - 1) * POSTS_PER_PAGE,
    take: POSTS_PER_PAGE,
  });
  const totalPages = Math.ceil(postsCount / POSTS_PER_PAGE);

  return (
    <section className="space-y-6">
      <PostsSectionHeader userRole={principal.role ?? undefined} />
      {posts.length ? (
        posts.map((post) => (
          <PostListItem
            key={post.id}
            post={post}
            toPost={myPostRoute.getPath({ id: post.id })}
            actionsMenu={<ListItemMenu post={post} />}
          />
        ))
      ) : (
        <EmptyList />
      )}
      <PostsPagination totalPages={totalPages} />
    </section>
  );
}
