import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo } from "react";
import { StoryCard } from "./StoryCard";
import type { Story } from "~/shared/types/story";
import { useHorizontalScroll } from "~/shared/hooks/useHorizontalScroll";
import { shuffle } from "~/shared/utils/shuffle";

interface StoryRowProps {
  title: string;
  stories: Story[];
  onRead: (story: Story) => void;
}

export function StoryRow({ title, stories, onRead }: StoryRowProps) {
  const { scrollContainerRef, showLeftArrow, showRightArrow, scroll } =
    useHorizontalScroll();

  const randomizedStories = useMemo(() => {
    return shuffle(stories);
  }, [stories]);

  return (
    <section
      className="px-8 md:px-16 mb-12 group/row"
      aria-labelledby={`row-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <h2
        id={`row-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
        className="text-white text-2xl font-semibold mb-6"
      >
        {title}
      </h2>
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/70 cursor-pointer"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {randomizedStories.map((story) => (
            <div key={story.id} className="shrink-0 w-48 md:w-80">
              <StoryCard story={story} onRead={onRead} />
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/50 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/70 cursor-pointer"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
    </section>
  );
}
