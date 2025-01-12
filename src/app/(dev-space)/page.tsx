import { postsRoute } from "@/routes/post/posts-route";
import { AppLogo } from "@/ui/components/shared/app-logo";
import { buttonVariants } from "@/ui/shadcn/ui/button";
import { Card, CardContent, CardHeader } from "@/ui/shadcn/ui/card";
import { Orbit, MoveRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="container">
      <Card>
        <CardHeader className="gap-y-6">
          <AppLogo
            className="justify-center text-7xl font-bold"
            iconClassName="size-16"
          />
          <p className="text-gray-500 text-xl text-center">
            Пространство для разработчиков
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link
            href={postsRoute.getPath()}
            className={buttonVariants({ variant: "default" })}
          >
            К публикациям
            <MoveRight className="ml-2 h-4 w-4" />
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
