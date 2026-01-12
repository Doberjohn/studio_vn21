import React from "react";
import { Clock } from "lucide-react";
import type { Story } from "~/types/story";
import { readingTime } from "reading-time-estimator";

interface StoryCardProps {
  story: Story;
  onRead: (story: Story) => void;
}

export function StoryCard({ story, onRead }: StoryCardProps) {
  return (
    <div
      className="group relative ml-5 cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10"
      onClick={() => onRead(story)}
    >
      <div className="aspect-[2/3] md:aspect-video rounded overflow-hidden bg-gray-800">
        <picture>
          {story.desktopCoverImage && (
            <source
              media="(min-width: 768px)"
              srcSet={story.desktopCoverImage}
            />
          )}
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </picture>
      </div>

      <div className="absolute inset-0 bg-black/90 rounded flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white mb-1">{story.title}</h3>
        <p className="text-gray-400 text-sm mb-2">by {story.author}</p>
        <p className="text-gray-300 text-sm line-clamp-2 mb-3">
          {story.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Clock className="w-3 h-3" />
            <span>{readingTime(story.content).text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
