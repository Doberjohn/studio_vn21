import { createServerClient } from "@supabase/ssr";

export function createClient(request: Request) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        const cookieHeader = request.headers.get("Cookie");
        if (!cookieHeader) return [];

        return cookieHeader.split(";").map((cookie) => {
          const [name, ...valueParts] = cookie.trim().split("=");
          return {
            name: name.trim(),
            value: decodeURIComponent(valueParts.join("="))
          };
        });
      },
      setAll(_cookiesToSet) {
      }
    },
  });
}
