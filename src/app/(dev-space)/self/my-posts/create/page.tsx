import { Roles } from "@/entity/role/roles";
import { CreatePostForm } from "@/ui/components/post";
import { AuthorizePage } from "@/ui/components/auth/authorize-page";

export default function CreatePostPage() {
  return (
    <AuthorizePage allowedRoles={[Roles.ADMIN, Roles.AUTHOR]}>
      <section className="gap-y-6">
        <p className="text-xl font-medium">Создание поста</p>
        <CreatePostForm />
      </section>
    </AuthorizePage>
  );
}
