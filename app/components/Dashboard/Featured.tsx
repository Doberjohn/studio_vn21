import type { Story } from "~/types/story";
import { Button } from "~/components/UI/Button";

interface FeaturedProps {
  story: Story;
  onRead: (story: Story) => void;
}

export function Featured({ story, onRead }: FeaturedProps) {
  return (
    <section className="relative h-[80vh] w-full" aria-labelledby="featured-story-title">
      <div className="absolute inset-0">
        <img
          src={story.featuredCoverImage}
          alt={`Cover for featured story: ${story.title}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex items-center px-8 md:px-16">
        <div className="max-w-2xl">
          <div className="text-green-400 font-medium mb-2">{story.genres.join(" | ")}</div>
          <h1 id="featured-story-title" className="text-white text-4xl md:text-5xl font-bold mb-4">{story.title}</h1>
          <p className="text-gray-300 text-lg mb-2">by {story.author}</p>
          <p className="text-white mb-6 line-clamp-3 text-lg leading-relaxed">{story.description}</p>
          <div className="flex gap-4">
            <Button onClick={() => onRead(story)} size="lg">Read Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
