"use client";

import { myAccountRoute } from "@/routes/self/account";
import { myPostsRoute } from "@/routes/self/post";
import { personalInfoRoute } from "@/routes/self/self-route";
import { Button } from "@/ui/shadcn/ui/button";
import { NotebookText, User, UserRoundCog } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SelfProfileNavigation() {
  const pathname = usePathname();
  const navItems = [
    {
      path: personalInfoRoute.getPath(),
      label: "Личная информация",
      icon: <User />,
    },
    {
      path: myPostsRoute.getPath(),
      label: "Мои публикации",
      icon: <NotebookText />,
    },
    {
      path: myAccountRoute.getPath(),
      label: "Аккаунт",
      icon: <UserRoundCog />,
    },
  ];

  return (
    <nav className="flex flex-col gap-y-2">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Button
            key={item.path}
            className={`flex justify-start text-base ${isActive ? "pointer-events-none" : ""} gap-2`}
            variant={isActive ? "outline" : "link"}
          >
            {item.icon}
            <Link href={item.path}>{item.label}</Link>
          </Button>
        );
      })}
    </nav>
  );
}
