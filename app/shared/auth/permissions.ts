export function canDelete(role: "ADMIN" | "EDITOR" | "VIEWER"): boolean {
  return role === "ADMIN";
}
