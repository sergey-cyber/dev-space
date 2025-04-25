import { ToggleThemeButton } from "./toggle-theme-button";
import Link from "next/link";
import { Button } from "@/ui/shadcn/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/shadcn/ui/avatar";
import { ProfileMenu } from "./profile-menu";
import { signinRoute } from "@/routes/auth/signin-route";
import { authService } from "@/service/auth/authService";
import { AppLogo } from "../shared/app-logo";

export async function AppHeader() {
  const user = await authService.getPrincipal();

  return (
    <header className="w-full border-b">
      <div className="container flex justify-between  h-14 items-center">
        <Link href={"/"} className="font-bold">
          <AppLogo />
        </Link>
        <div className="flex space-x-5">
          <ToggleThemeButton />
          {!user ? (
            <Link href={signinRoute.getPath()}>
              <Button>Войти</Button>
            </Link>
          ) : (
            <ProfileMenu>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.image ?? undefined} alt="avatar" />
                <AvatarFallback>
                  {user.name?.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </ProfileMenu>
          )}
        </div>
      </div>
    </header>
  );
}
