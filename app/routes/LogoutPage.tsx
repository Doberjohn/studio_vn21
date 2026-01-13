import type { Route } from "./+types/LogoutPage";
import { redirect } from "react-router";
import { createClient } from "~/shared/auth/supabase.server";

export async function loader({ request }: Route.LoaderArgs) {
  const supabase = createClient(request);
  await supabase.auth.signOut();
  throw redirect("/login");
}
