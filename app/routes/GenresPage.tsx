import type { Route } from "./+types/GenresPage";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation
} from "react-router";
import { Navbar } from "~/shared/components/Navbar";
import { Button } from "~/shared/components/Button";
import { getAllGenres } from "~/features/genres/data/genreService";
import {
  createGenre,
  deleteGenre,
  updateGenre
} from "~/features/genres/data/genreMutations";
import { ArrowLeft, Edit, Plus, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { requireRole } from "~/shared/auth/auth.server";
import { canDelete } from "~/shared/auth/permissions";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireRole(request, ["ADMIN", "EDITOR"]);
  const genres = await getAllGenres();
  return { genres, user };
}

export async function action({ request }: Route.ActionArgs) {
  const user = await requireRole(request, ["ADMIN", "EDITOR"]);
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  try {
    if (intent === "create") {
      await createGenre({
        name: formData.get("name") as string,
        isVisible: formData.get("isVisible") === "on"
      });
      return redirect("/adminManagementSection/genres");
    }

    if (intent === "update") {
      await updateGenre({
        id: formData.get("id") as string,
        name: formData.get("name") as string,
        isVisible: formData.get("isVisible") === "on"
      });
      return redirect("/adminManagementSection/genres");
    }

    if (intent === "delete") {
      // Only admins can delete
      if (user.role !== "ADMIN") {
        return { error: "Only admins can delete genres" };
      }
      await deleteGenre(formData.get("id") as string);
      return redirect("/adminManagementSection/genres");
    }

    return { error: "Invalid action" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "An error occurred"
    };
  }
}

export default function GenresPage({ loaderData }: Route.ComponentProps) {
  const { genres, user } = loaderData;
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const [editingGenre, setEditingGenre] = useState<(typeof genres)[0] | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isSubmitting = navigation.state === "submitting";

  const filteredGenres = useMemo(() => {
    if (!searchQuery) return genres;
    const query = searchQuery.toLowerCase();
    return genres.filter((genre) => genre.name.toLowerCase().includes(query));
  }, [genres, searchQuery]);

  const hasActiveFilters = !!searchQuery;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto mt-10 px-8 py-16">
        <Link
          to="/adminManagementSection"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin Dashboard
        </Link>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Genres Management</h1>
            <p className="text-gray-400">
              All Genres ({filteredGenres.length}
              {hasActiveFilters && ` of ${genres.length}`})
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingGenre(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Genre
          </Button>
        </div>

        {actionData?.error && (
          <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded mb-6">
            {actionData.error}
          </div>
        )}

        <div className="mb-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
                className="text-gray-400 hover:text-white"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {(showForm || editingGenre) && (
          <GenreForm
            genre={editingGenre}
            onCancel={() => {
              setEditingGenre(null);
              setShowForm(false);
            }}
            isSubmitting={isSubmitting}
          />
        )}

        <div className="mt-4">
          {filteredGenres.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No genres found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredGenres.map((genre) => (
                <GenreCard
                  key={genre.id}
                  genre={genre}
                  onEdit={() => {
                    setEditingGenre(genre);
                    setShowForm(true);
                  }}
                  isSubmitting={isSubmitting}
                  canDelete={canDelete(user.role)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GenreCard({
                     genre,
                     onEdit,
                     isSubmitting,
                     canDelete: userCanDelete
                   }: {
  genre: { id: string; name: string; isVisible: boolean; storyCount?: number };
  onEdit: () => void;
  isSubmitting: boolean;
  canDelete: boolean;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-semibold">{genre.name}</h3>
          {!genre.isVisible && (
            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
              Hidden
            </span>
          )}
        </div>
        <p className="text-gray-400">
          {genre.storyCount || 0} {genre.storyCount === 1 ? "story" : "stories"}
        </p>
      </div>
      <div className="flex gap-2 ml-4">
        <Button
          variant="outline"
          onClick={onEdit}
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit
        </Button>
        {userCanDelete && (
          <Form method="post">
            <input type="hidden" name="intent" value="delete" />
            <input type="hidden" name="id" value={genre.id} />
            <Button
              type="submit"
              variant="outline"
              disabled={isSubmitting}
              className="flex items-center gap-2 text-red-400 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}

function GenreForm({
                     genre,
                     onCancel,
                     isSubmitting
                   }: {
  genre: { id: string; name: string; isVisible: boolean } | null;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {genre ? "Edit Genre" : "Create New Genre"}
        </h2>
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <Form method="post" className="space-y-6">
        <input
          type="hidden"
          name="intent"
          value={genre ? "update" : "create"}
        />
        {genre && <input type="hidden" name="id" value={genre.id} />}

        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={genre?.name}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isVisible"
              defaultChecked={genre?.isVisible !== false}
              className="w-4 h-4"
            />
            <span>Visible</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : genre
                ? "Update Genre"
                : "Create Genre"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}
