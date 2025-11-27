import type { Story } from "~/types/story";
import { Button } from "~/components/Button";

interface FeaturedProps {
  story: Story;
  onRead: (story: Story) => void;
}

export function Featured({ story, onRead }: FeaturedProps) {
  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src={story.featuredCoverImage}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex items-center px-8 md:px-16">
        <div className="max-w-2xl">
          <div className="text-green-400 mb-2">{story.genres.join(' | ')}</div>
          <p className="text-white text-4xl mb-4">{story.title}</p>
          <p className="text-gray-300 mb-2">by {story.author}</p>
          <p className="text-white mb-6 line-clamp-3">{story.description}</p>
          <div className="flex gap-4">
            <Button onClick={() => onRead(story)}>
              Read Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
