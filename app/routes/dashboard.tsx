import { useState } from "react";
import { Navbar } from "~/components/Navbar";
import { Featured } from "~/components/Dashboard/Featured";
import { StoryRow } from "~/components/Dashboard/StoryRow";
import { StoryReader } from "~/components/Dashboard/StoryReader";
import {
  stories,
  getFeaturedStory,
  getStoriesByGenre,
  genres,
} from "~/data/stories";
import type { Story } from "~/types/story";

export default function App() {
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

      <Featured story={featuredStory} onRead={handleReadStory} />

      <div className="relative z-10 -mt-32">
        <StoryRow
          title="Trending Now"
          stories={stories.slice(0, 6)}
          onRead={handleReadStory}
        />

        {genres.map((genre) => {
          const genreStories = getStoriesByGenre(genre);
          if (genreStories.length === 0) return null;

          return (
            <StoryRow
              key={genre}
              title={genre}
              stories={genreStories}
              onRead={handleReadStory}
            />
          );
        })}

        <StoryRow
          title="Popular This Week"
          stories={stories.slice(2, 8)}
          onRead={handleReadStory}
        />
      </div>

      {selectedStory && (
        <StoryReader story={selectedStory} onClose={handleCloseReader} />
      )}
    </div>
  );
}
