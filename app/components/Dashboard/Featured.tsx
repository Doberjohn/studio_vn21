import { Play, Info } from "lucide-react";
import type { Story } from "~/types/story";

interface FeaturedProps {
  story: Story;
  onRead: (story: Story) => void;
}

export function Featured({ story, onRead }: FeaturedProps) {
  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex items-center px-8 md:px-16">
        <div className="max-w-2xl">
          <div className="text-green-400 mb-2">{story.genre}</div>
          <h2 className="text-white mb-4">{story.title}</h2>
          <p className="text-gray-300 mb-2">by {story.author}</p>
          <p className="text-white mb-6 line-clamp-3">{story.description}</p>
          <div className="flex gap-4">
            <button
              onClick={() => onRead(story)}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition-colors"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              Read Now
            </button>
            <button className="flex items-center gap-2 bg-gray-600/70 text-white px-8 py-3 rounded hover:bg-gray-600 transition-colors">
              <Info className="w-5 h-5" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
