import type { Route } from "./+types/EditStoryPage";
import { Form, Link, redirect, useActionData, useNavigation } from "react-router";
import { Navbar } from "~/shared/components/Navbar";
import { Button } from "~/shared/components/Button";
import { getStoryByIdForAdmin } from "~/features/stories/data/storyService";
import { updateStory } from "~/features/stories/data/storyMutations";
import { ArrowLeft } from "lucide-react";

export async function loader({ params }: Route.LoaderArgs) {
  const story = await getStoryByIdForAdmin(params.id!);
  if (!story) {
    throw new Response("Story not found", { status: 404 });
  }
  return { story };
}

export async function action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();

  try {
    await updateStory({
      id: params.id!,
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      description: formData.get("description") as string,
      content: formData.get("content") as string,
      coverImage: formData.get("coverImage") as string,
      desktopCoverImage: formData.get("desktopCoverImage") as string || undefined,
      featuredCoverImage: formData.get("featuredCoverImage") as string || undefined,
      publishDate: formData.get("publishDate") as string,
      featured: formData.get("featured") === "on",
      isVisible: formData.get("isVisible") === "on",
      genres: formData.get("genres")?.toString().split(",").map(g => g.trim()).filter(Boolean) || [],
      collections: formData.get("collections")?.toString().split(",").map(c => c.trim()).filter(Boolean) || []
    });
    return redirect("/storyManagementSection");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "An error occurred"
    };
  }
}

export default function EditStoryPage({ loaderData }: Route.ComponentProps) {
  const { story } = loaderData;
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-8 py-16 max-w-4xl">
        <Link to="/storyManagementSection"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Stories
        </Link>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Edit Story</h1>

          {actionData?.error && (
            <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded mb-6">
              {actionData.error}
            </div>
          )}

          <Form method="post" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={story.title}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Author *</label>
                <input
                  type="text"
                  name="author"
                  required
                  defaultValue={story.author}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                name="description"
                required
                rows={3}
                defaultValue={story.description}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content *</label>
              <textarea
                name="content"
                required
                rows={10}
                defaultValue={story.content}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white font-mono"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Cover Image URL *</label>
                <input
                  type="url"
                  name="coverImage"
                  required
                  defaultValue={story.coverImage}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Desktop Cover Image URL</label>
                <input
                  type="url"
                  name="desktopCoverImage"
                  defaultValue={story.desktopCoverImage}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Featured Cover Image URL</label>
                <input
                  type="url"
                  name="featuredCoverImage"
                  defaultValue={story.featuredCoverImage}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Publish Date (DD/MM/YYYY) *</label>
                <input
                  type="text"
                  name="publishDate"
                  required
                  pattern="\d{2}/\d{2}/\d{4}"
                  placeholder="DD/MM/YYYY"
                  defaultValue={story.publishDate}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Genres (comma-separated) *</label>
                <input
                  type="text"
                  name="genres"
                  required
                  placeholder="Fantasy, Mystery, Romance"
                  defaultValue={story.genres.join(", ")}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Collections (comma-separated)</label>
              <input
                type="text"
                name="collections"
                placeholder="Summer Reads, Best of 2024"
                defaultValue={story.collections.join(", ")}
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={story.featured}
                  className="w-4 h-4"
                />
                <span>Featured Story</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isVisible"
                  defaultChecked
                  className="w-4 h-4"
                />
                <span>Visible</span>
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Story"}
              </Button>
              <Link to="/storyManagementSection">
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
