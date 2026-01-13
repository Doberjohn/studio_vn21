import type { Route } from "./+types/AdminPage";
import { Form, redirect, useActionData, useNavigation } from "react-router";
import { Navbar } from "~/shared/components/Navbar";
import { Button } from "~/shared/components/Button";
import { getAllStoriesForAdmin } from "~/features/stories/data/storyService";
import { createStory, deleteStory, updateStory } from "~/features/stories/data/storyMutations";
import type { Story } from "~/shared/types/story";
import { useState } from "react";
import { Edit, Plus, Trash2, X } from "lucide-react";

export async function loader({}: Route.LoaderArgs) {
  const stories = await getAllStoriesForAdmin();
  return { stories };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  try {
    if (intent === "create") {
      await createStory({
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
      return redirect("/");
    }

    if (intent === "update") {
      await updateStory({
        id: formData.get("id") as string,
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
    }

    if (intent === "delete") {
      await deleteStory(formData.get("id") as string);
      return redirect("/storyManagementSection");
    }

    return { error: "Invalid action" };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "An error occurred"
    };
  }
}

export default function AdminPage({ loaderData }: Route.ComponentProps) {
  const { stories } = loaderData;
  const actionData = useActionData<{ error?: string }>();
  const navigation = useNavigation();
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [showForm, setShowForm] = useState(false);

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Story Management</h1>
          <Button
            onClick={() => {
              setEditingStory(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Story
          </Button>
        </div>

        {actionData?.error && (
          <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded mb-6">
            {actionData.error}
          </div>
        )}

        {(showForm || editingStory) && (
          <StoryForm
            story={editingStory}
            onCancel={() => {
              setEditingStory(null);
              setShowForm(false);
            }}
            isSubmitting={isSubmitting}
          />
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">All Stories ({stories.length})</h2>
          <div className="space-y-4">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                onEdit={() => {
                  setEditingStory(story);
                  setShowForm(true);
                }}
                isSubmitting={isSubmitting}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryCard({
                     story,
                     onEdit,
                     isSubmitting
                   }: {
  story: Story;
  onEdit: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-semibold">{story.title}</h3>
          {story.featured && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">Featured</span>
          )}
        </div>
        <p className="text-gray-400 mb-2">by {story.author}</p>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{story.description}</p>
        <div className="flex gap-2 flex-wrap">
          {story.genres.map((genre) => (
            <span key={genre} className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
              {genre}
            </span>
          ))}
        </div>
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
        <Form method="post">
          <input type="hidden" name="intent" value="delete" />
          <input type="hidden" name="id" value={story.id} />
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
      </div>
    </div>
  );
}

function StoryForm({
                     story,
                     onCancel,
                     isSubmitting
                   }: {
  story: Story | null;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{story ? "Edit Story" : "Create New Story"}</h2>
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <Form method="post" className="space-y-6">
        <input type="hidden" name="intent" value={story ? "update" : "create"} />
        {story && <input type="hidden" name="id" value={story.id} />}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              name="title"
              required
              defaultValue={story?.title}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Author *</label>
            <input
              type="text"
              name="author"
              required
              defaultValue={story?.author}
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
            defaultValue={story?.description}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content *</label>
          <textarea
            name="content"
            required
            rows={10}
            defaultValue={story?.content}
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
              defaultValue={story?.coverImage}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Desktop Cover Image URL</label>
            <input
              type="url"
              name="desktopCoverImage"
              defaultValue={story?.desktopCoverImage}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Featured Cover Image URL</label>
            <input
              type="url"
              name="featuredCoverImage"
              defaultValue={story?.featuredCoverImage}
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
              defaultValue={story?.publishDate}
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
              defaultValue={story?.genres.join(", ")}
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
            defaultValue={story?.collections.join(", ")}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={story?.featured}
              className="w-4 h-4"
            />
            <span>Featured Story</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isVisible"
              defaultChecked={story ? true : true}
              className="w-4 h-4"
            />
            <span>Visible</span>
          </label>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : story ? "Update Story" : "Create Story"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}
