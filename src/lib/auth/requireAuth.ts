import { authService } from "../../service/auth/authService";

/**
 * Redirect to login if user is not authenticated.
 *
 * @returns {Function} A decorator that intercepts method calls and checks for authentification.
 */

export function AuthRequired() {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      await authService.getPrincipalStricktly();

      return await originalMethod.apply(this, args);
    };
  };
}
