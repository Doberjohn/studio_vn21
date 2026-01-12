import { useState } from "react";
import { Navbar } from "~/shared/components/Navbar";
import { StoryFeatured, StoryRow, StoryReader } from "~/features/stories";
import {
  stories,
  getFeaturedStory,
  getStoriesByGenre,
  getStoriesByCollection,
  genres,
  collections,
} from "~/features/stories/data/stories";
import type { Story } from "~/shared/types/story";

interface StorySectionProps {
  title: string;
  stories: Story[];
  onRead: (story: Story) => void;
}

function StorySection({ title, stories, onRead }: StorySectionProps) {
  if (stories.length === 0) return null;
  return <StoryRow title={title} stories={stories} onRead={onRead} />;
}

export default function DashboardPage() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const featuredStory = getFeaturedStory() || stories[0];

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

      <div className="relative z-10 -mt-32">
        <StorySection
          title="Trending Now"
          stories={stories.slice(0, 8)}
          onRead={handleReadStory}
        />

        {collections.map((collection) => (
          <StorySection
            key={collection}
            title={collection}
            stories={getStoriesByCollection(collection)}
            onRead={handleReadStory}
          />
        ))}

        {genres.map((genre) => (
          <StorySection
            key={genre}
            title={genre}
            stories={getStoriesByGenre(genre)}
            onRead={handleReadStory}
          />
        ))}
      </div>

      {selectedStory && (
        <StoryReader story={selectedStory} onClose={handleCloseReader} />
      )}
    </div>
  );
}
