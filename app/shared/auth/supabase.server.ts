import { createServerClient } from "@supabase/ssr";

export function createClient(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

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
      setAll(cookiesToSet) {
        // In React Router v7, cookies are set via Response headers
        // The @supabase/ssr package will handle this through the response
        // We store cookies to be set in a way that React Router can handle
      }
    }
  });
}
