import { auth } from "@/auth";
import { signinRoute } from "@/routes/auth/signin-route";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export class AuthService {
  constructor() {}

  public async getPrincipal() {
    const session = await auth();
    return session?.user as User | undefined;
  }

  public async getPrincipalStricktly() {
    const principal = await this.getPrincipal();
    if (!principal) {
      return redirect(signinRoute.getPath());
    }
    return principal;
  }
}

export type AuthServiceType = AuthService;
export const authService = new AuthService();
