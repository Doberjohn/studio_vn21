import type { Route } from "@react-router/dev/routes";
import type { AuthenticatedUser } from "./auth.server";
import { requireAuth, requireRole } from "./auth.server";

export function withAuth<T extends Route.LoaderArgs>(
  loader: (args: T & { user: AuthenticatedUser }) => Promise<Response | object>
) {
  return async (args: T) => {
    const user = await requireAuth(args.request);
    return loader({ ...args, user });
  };
}

export function withRole<T extends Route.LoaderArgs>(
  allowedRoles: ("ADMIN" | "EDITOR" | "VIEWER")[],
  loader: (args: T & { user: AuthenticatedUser }) => Promise<Response | object>
) {
  return async (args: T) => {
    const user = await requireRole(args.request, allowedRoles);
    return loader({ ...args, user });
  };
}
