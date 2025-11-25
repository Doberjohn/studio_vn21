import { useState } from "react";
import { Play, Clock } from "lucide-react";
import type { Story } from "~/types/story";

interface StoryCardProps {
  story: Story;
  onRead: (story: Story) => void;
}

export function StoryCard({ story, onRead }: StoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onRead(story)}
    >
      <div className="aspect-[2/3] rounded overflow-hidden bg-gray-800">
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover"
        />
      </div>

      {isHovered && (
        <div className="absolute inset-0 bg-black/90 rounded flex flex-col justify-end p-4 transition-opacity duration-300">
          <h3 className="text-white mb-1">{story.title}</h3>
          <p className="text-gray-400 text-sm mb-2">by {story.author}</p>
          <p className="text-gray-300 text-sm line-clamp-2 mb-3">
            {story.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Clock className="w-3 h-3" />
              <span>{story.duration}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRead(story);
              }}
              className="flex items-center gap-1 bg-white text-black px-3 py-1.5 rounded text-sm hover:bg-gray-200 transition-colors"
            >
              <Play className="w-3 h-3" fill="currentColor" />
              Read
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
