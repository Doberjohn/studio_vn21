import type { Route } from "./+types/AdminDashboardPage";
import { Link } from "react-router";
import { Navbar } from "~/shared/components/Navbar";
import { Button } from "~/shared/components/Button";
import { BookOpen, FolderTree, Tag } from "lucide-react";
import { requireAuth } from "~/shared/auth/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireAuth(request);
  return { user };
}

export default function AdminDashboardPage({
                                             loaderData
                                           }: Route.ComponentProps) {
  const { user } = loaderData;
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto mt-10 px-8 py-16">
        <div className="mb-12">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-gray-400 text-lg">
                Manage your content library - stories, collections, and genres
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">{user.email}</p>
              <span className="inline-block bg-red-600/20 text-red-400 text-xs px-2 py-1 rounded mt-1">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Stories Management Card */}
          <Link to="/adminManagementSection/stories" className="group">
            <div
              className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-red-600 transition-colors h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-600/20 p-3 rounded-lg group-hover:bg-red-600/30 transition-colors">
                  <BookOpen className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold">Stories</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Create, edit, and manage your story collection. Add new stories,
                update or organize existing ones.
              </p>
              <Button
                variant="outline"
                className="w-full group-hover:border-red-600 group-hover:text-red-600"
              >
                Manage Stories →
              </Button>
            </div>
          </Link>

          {/* Collections Management Card */}
          <Link to="/adminManagementSection/collections" className="group">
            <div
              className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-red-600 transition-colors h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-600/20 p-3 rounded-lg group-hover:bg-red-600/30 transition-colors">
                  <FolderTree className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold">Collections</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Organize stories into collections. Create themed groups like
                "Summer Reads" or "Best of 2024".
              </p>
              <Button
                variant="outline"
                className="w-full group-hover:border-red-600 group-hover:text-red-600"
              >
                Manage Collections →
              </Button>
            </div>
          </Link>

          {/* Genres Management Card */}
          <Link to="/adminManagementSection/genres" className="group">
            <div
              className="bg-gray-900 border border-gray-800 rounded-lg p-8 hover:border-red-600 transition-colors h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-600/20 p-3 rounded-lg group-hover:bg-red-600/30 transition-colors">
                  <Tag className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold">Genres</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Manage story genres. Add new categories, edit existing ones, and
                control which genres are visible.
              </p>
              <Button
                variant="outline"
                className="w-full group-hover:border-red-600 group-hover:text-red-600"
              >
                Manage Genres →
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
