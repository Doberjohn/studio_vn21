import type { Route } from "./+types/AdminPage";
import { Form, Link, redirect, useNavigation } from "react-router";
import { Navbar } from "~/shared/components/Navbar";
import { Button } from "~/shared/components/Button";
import { getAllStoriesForAdmin } from "~/features/stories/data/storyService";
import { deleteStory } from "~/features/stories/data/storyMutations";
import type { Story } from "~/shared/types/story";
import { Edit, Plus, Trash2 } from "lucide-react";

export async function loader({}: Route.LoaderArgs) {
  const stories = await getAllStoriesForAdmin();
  return { stories };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "delete") {
    await deleteStory(formData.get("id") as string);
    return redirect("/storyManagementSection");
  }

  return { error: "Invalid action" };
}

export default function AdminPage({ loaderData }: Route.ComponentProps) {
  const { stories } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto mt-10 px-8 py-16">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">All Stories ({stories.length})</h2>
          <Link to="/storyManagementSection/new">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Story
            </Button>
          </Link>
        </div>

        <div className="mt-4">
          <div className="space-y-4">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
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
                     isSubmitting
                   }: {
  story: Story;
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
        <Link to={`/storyManagementSection/${story.id}/edit`}>
          <Button
            variant="outline"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        </Link>
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
