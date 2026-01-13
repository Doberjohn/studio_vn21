import type { Route } from "./+types/LoginPage";
import { Form, Link, redirect, useActionData, useSearchParams } from "react-router";
import { Navbar } from "~/shared/components/Navbar";
import { Button } from "~/shared/components/Button";
import { createClient } from "~/shared/auth/supabase.server";
import { getUser } from "~/shared/auth/auth.server";
import { ArrowLeft } from "lucide-react";

export async function loader({ request }: Route.LoaderArgs) {
  // If already authenticated, redirect to admin dashboard
  const user = await getUser(request);
  if (user) {
    throw redirect("/adminManagementSection");
  }
  return {};
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirect") as string || "/adminManagementSection";

  const supabase = createClient(request);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return {
      error: error.message,
      email
    };
  }

  if (!data.user) {
    return {
      error: "Invalid email or password",
      email
    };
  }

  // Sync user to database if doesn't exist
  const { prisma } = await import("~/shared/db/prisma");
  await prisma.user.upsert({
    where: { authUserId: data.user.id },
    update: {
      email: data.user.email!
    },
    create: {
      authUserId: data.user.id,
      email: data.user.email!,
      role: "ADMIN" // First user is admin, can be changed later
    }
  });

  throw redirect(redirectTo);
}

export default function LoginPage() {
  const actionData = useActionData<{ error?: string; email?: string }>();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/adminManagementSection";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto mt-10 px-8 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="max-w-md mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
            <p className="text-gray-400 mb-6">
              Sign in to access the admin dashboard
            </p>

            {actionData?.error && (
              <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded mb-6">
                {actionData.error}
              </div>
            )}

            <Form method="post" className="space-y-6">
              <input type="hidden" name="redirect" value={redirectTo} />

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue={actionData?.email}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  placeholder="••••••••"
                />
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
