import { Access } from "@/lib/auth/access";
import { IServiceClient } from "../client/IClient";
import _prismaClient from "@/service/prisma/prisma-client";
import { Roles } from "@/entity/role/roles";
import {
  authService as authServiceInstance,
  AuthServiceType,
} from "../auth/authService";

class UserService {
  private client;
  private authService;

  constructor(client: IServiceClient, authService: AuthServiceType) {
    this.client = client;
    this.authService = authService;
  }

  @Access([Roles.ADMIN])
  public async deleteUser(id: string) {
    return this.client.user.delete({ where: { id } });
  }

  public async deleteSelf() {
    const principal = await this.authService.getPrincipalStricktly();
    if (principal.id) {
      return this.client.user.delete({ where: { id: principal.id } });
    }
  }
}

export const userService = new UserService(_prismaClient, authServiceInstance);
