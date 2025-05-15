import { forbiddenRoute } from "@/routes/auth/forbidden-route";
import { authService } from "@/service/auth/authService";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  /**
   * List of roles that have access to the page
   */
  allowedRoles: string[];

  /**
   * Custom redirect URL if user doesn't have access
   * If not provided, redirects to default forbidden page
   */
  redirectUrl?: string;

  /**
   * Content to render if user has access
   */
  children: ReactNode;
}

export async function AuthorizePage({
  allowedRoles,
  redirectUrl,
  children,
}: Props) {
  const principal = await authService.getPrincipalStricktly();
  const hasAccess = allowedRoles.includes(principal.role ?? "");

  if (!hasAccess) {
    redirect(redirectUrl ?? forbiddenRoute.getPath());
  }

  return <>{children}</>;
}
