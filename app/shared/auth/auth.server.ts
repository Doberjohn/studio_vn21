import { createClient } from "./supabase.server";
import { redirect } from "react-router";
import { prisma } from "~/shared/db/prisma";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "VIEWER";
  authUserId: string;
}

export async function getUser(request: Request): Promise<AuthenticatedUser | null> {
  const supabase = createClient(request);

  const {
    data: { user: authUser },
    error
  } = await supabase.auth.getUser();

  if (error || !authUser) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { authUserId: authUser.id }
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role as "ADMIN" | "EDITOR" | "VIEWER",
    authUserId: user.authUserId
  };
}

export async function requireAuth(request: Request): Promise<AuthenticatedUser> {
  const user = await getUser(request);

  if (!user) {
    throw redirect("/login?redirect=" + encodeURIComponent(new URL(request.url).pathname));
  }

  return user;
}

export async function requireRole(
  request: Request,
  allowedRoles: ("ADMIN" | "EDITOR" | "VIEWER")[]
): Promise<AuthenticatedUser> {
  const user = await requireAuth(request);

  if (!allowedRoles.includes(user.role)) {
    throw new Response("Forbidden", { status: 403 });
  }

  return user;
}

export async function getUserRole(
  request: Request
): Promise<"ADMIN" | "EDITOR" | "VIEWER" | null> {
  const user = await getUser(request);
  return user?.role ?? null;
}

export function canDelete(role: "ADMIN" | "EDITOR" | "VIEWER"): boolean {
  return role === "ADMIN";
}

export function canEdit(role: "ADMIN" | "EDITOR" | "VIEWER"): boolean {
  return role === "ADMIN" || role === "EDITOR";
}

export function canView(role: "ADMIN" | "EDITOR" | "VIEWER"): boolean {
  return true; // All roles can view
}
