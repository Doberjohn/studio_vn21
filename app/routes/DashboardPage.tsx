import type { Route } from "./+types/DashboardPage";
import { useState } from "react";
import { Navbar } from "~/shared/components/Navbar";
import { StoryFeatured, StoryRow, StoryReader } from "~/features/stories";
import {
  getAllStories,
  getFeaturedStory,
  getAllGenres,
  getAllCollections,
} from "~/features/stories/data/storyService";
import type { Story } from "~/shared/types/story";

export async function loader({}: Route.LoaderArgs) {
  try {
    const [stories, featuredStory, genres, collections] = await Promise.all([
      getAllStories(),
      getFeaturedStory(),
      getAllGenres(),
      getAllCollections(),
    ]);

    return {
      stories,
      featuredStory: featuredStory || stories[0],
      genres,
      collections,
    };
  } catch (error) {
    console.error("Dashboard loader error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load dashboard data";

    // Log more details in production for debugging
    if (error instanceof Error && error.stack) {
      console.error("Error stack:", error.stack);
    }

    // Check if it's a database connection error
    if (
      error instanceof Error &&
      (error.message.includes("DATABASE_URL") ||
        error.message.includes("connection") ||
        error.message.includes("ECONNREFUSED"))
    ) {
      throw new Response(
        "Database connection failed. Please check your DATABASE_URL environment variable.",
        { status: 500 },
      );
    }

    // Re-throw to trigger ErrorBoundary
    throw new Response(errorMessage, { status: 500 });
  }
}

interface StorySectionProps {
  title: string;
  stories: Story[];
  onRead: (story: Story) => void;
}

function StorySection({ title, stories, onRead }: StorySectionProps) {
  if (stories.length === 0) return null;
  return <StoryRow title={title} stories={stories} onRead={onRead} />;
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  const { stories, featuredStory, genres, collections } = loaderData;
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const handleReadStory = (story: Story) => {
    setSelectedStory(story);
  };

  const handleCloseReader = () => {
    setSelectedStory(null);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <StoryFeatured story={featuredStory} onRead={handleReadStory} />

      <div className="relative z-10">
        <StorySection
          title="Trending Now"
          stories={stories.slice(0, 8)}
          onRead={handleReadStory}
        />

        {collections.map((collection) => {
          const collectionStories = stories.filter((s) =>
            s.collections.includes(collection),
          );
          return (
            <StorySection
              key={collection}
              title={collection}
              stories={collectionStories}
              onRead={handleReadStory}
            />
          );
        })}

        {genres.map((genre) => {
          const genreStories = stories.filter((s) => s.genres.includes(genre));
          return (
            <StorySection
              key={genre}
              title={genre}
              stories={genreStories}
              onRead={handleReadStory}
            />
          );
        })}
      </div>

      {selectedStory && (
        <StoryReader story={selectedStory} onClose={handleCloseReader} />
      )}
    </div>
  );
}
