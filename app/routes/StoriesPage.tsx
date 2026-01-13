import type { Route } from "./+types/StoriesPage";
import { Form, Link, redirect, useNavigation } from "react-router";
import { Navbar } from "~/shared/components/Navbar";
import { Button } from "~/shared/components/Button";
import { getAllStoriesForAdmin } from "~/features/stories/data/storyService";
import { deleteStory } from "~/features/stories/data/storyMutations";
import type { Story } from "~/shared/types/story";
import { ArrowLeft, Edit, Plus, Search, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { canDelete, requireRole } from "~/shared/auth/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const user = await requireRole(request, ["ADMIN", "EDITOR"]);
  const stories = await getAllStoriesForAdmin();
  return { stories, user };
}

export async function action({ request }: Route.ActionArgs) {
  await requireRole(request, ["ADMIN"]);
  
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  if (intent === "delete") {
    await deleteStory(formData.get("id") as string);
    return redirect("/adminManagementSection/stories");
  }

  return { error: "Invalid action" };
}

export default function StoriesPage({ loaderData }: Route.ComponentProps) {
  const { stories, user } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("all");
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    stories.forEach((story) => {
      story.genres.forEach((genre) => genres.add(genre));
    });
    return Array.from(genres).sort();
  }, [stories]);

  const allAuthors = useMemo(() => {
    const authors = new Set<string>();
    stories.forEach((story) => {
      authors.add(story.author);
    });
    return Array.from(authors).sort();
  }, [stories]);

  const allCollections = useMemo(() => {
    const collections = new Set<string>();
    stories.forEach((story) => {
      story.collections.forEach((collection) => collections.add(collection));
    });
    return Array.from(collections).sort();
  }, [stories]);

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          story.title.toLowerCase().includes(query) ||
          story.author.toLowerCase().includes(query) ||
          story.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (selectedGenre !== "all") {
        if (!story.genres.includes(selectedGenre)) return false;
      }

      if (selectedAuthor !== "all") {
        if (story.author !== selectedAuthor) return false;
      }

      if (selectedCollection !== "all") {
        if (!story.collections.includes(selectedCollection)) return false;
      }

      if (featuredFilter === "featured" && !story.featured) return false;

      return !(featuredFilter === "not-featured" && story.featured);
    });
  }, [
    stories,
    searchQuery,
    selectedGenre,
    selectedAuthor,
    selectedCollection,
    featuredFilter
  ]);

  const hasActiveFilters =
    searchQuery ||
    selectedGenre !== "all" ||
    selectedAuthor !== "all" ||
    selectedCollection !== "all" ||
    featuredFilter !== "all";

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
            <h1 className="text-3xl font-bold mb-2">Stories Management</h1>
            <p className="text-gray-400">
              All Stories ({filteredStories.length}
              {hasActiveFilters && ` of ${stories.length}`})
            </p>
          </div>
          <Link to="/adminManagementSection/stories/new">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Story
            </Button>
          </Link>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, author, or description..."
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
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              Filters
              {hasActiveFilters && (
                <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {
                    [
                      searchQuery,
                      selectedGenre !== "all",
                      selectedAuthor !== "all",
                      selectedCollection !== "all",
                      featuredFilter !== "all"
                    ].filter(Boolean).length
                  }
                </span>
              )}
            </Button>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedGenre("all");
                  setSelectedAuthor("all");
                  setSelectedCollection("all");
                  setFeaturedFilter("all");
                }}
                className="text-gray-400 hover:text-white"
              >
                Clear All
              </Button>
            )}
          </div>

          {showFilters && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Genre
                  </label>
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  >
                    <option value="all">All Genres</option>
                    {allGenres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Author
                  </label>
                  <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  >
                    <option value="all">All Authors</option>
                    {allAuthors.map((author) => (
                      <option key={author} value={author}>
                        {author}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Collection
                  </label>
                  <select
                    value={selectedCollection}
                    onChange={(e) => setSelectedCollection(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  >
                    <option value="all">All Collections</option>
                    {allCollections.map((collection) => (
                      <option key={collection} value={collection}>
                        {collection}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Featured Status
                  </label>
                  <select
                    value={featuredFilter}
                    onChange={(e) => setFeaturedFilter(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white"
                  >
                    <option value="all">All Stories</option>
                    <option value="featured">Featured Only</option>
                    <option value="not-featured">Not Featured</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          {filteredStories.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No stories found matching your filters.</p>
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedGenre("all");
                    setSelectedAuthor("all");
                    setSelectedCollection("all");
                    setFeaturedFilter("all");
                  }}
                  className="mt-4 text-red-600 hover:text-red-500 underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStories.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
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

function StoryCard({
                     story,
                     isSubmitting,
                     canDelete: userCanDelete
                   }: {
  story: Story;
  isSubmitting: boolean;
  canDelete: boolean;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 flex justify-between items-start">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-semibold">{story.title}</h3>
          {story.featured && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
              Featured
            </span>
          )}
        </div>
        <p className="text-gray-400 mb-2">by {story.author}</p>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {story.description}
        </p>
        <div className="flex gap-2 flex-wrap">
          {story.genres.map((genre) => (
            <span
              key={genre}
              className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        <Link to={`/adminManagementSection/stories/${story.id}/edit`}>
          <Button
            variant="outline"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        </Link>
        {userCanDelete && (
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
        )}
      </div>
    </div>
  );
}
