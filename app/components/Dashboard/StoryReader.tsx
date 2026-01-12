import { X, Clock, User } from "lucide-react";
import { useEffect } from "react";
import type { Story } from "~/types/story";
import { Button } from "~/components/UI/Button";
import { readingTime } from "reading-time-estimator";

interface StoryReaderProps {
  story: Story;
  onClose: () => void;
}

export function StoryReader({ story, onClose }: StoryReaderProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onClose}
            className="fixed top-4 right-4 w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="mb-8">
            <div className="text-green-400 mb-2">
              {story.genres.join(" | ")}
            </div>
            <h1 className="text-white mb-3">{story.title}</h1>
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{story.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readingTime(story.content).text}</span>
              </div>
            </div>
            <p className="text-gray-300 text-lg italic">{story.description}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            {story.content.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-200 text-lg mb-4 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-center">The End</p>
            <div className="flex justify-center gap-4 mt-6">
              <Button onClick={onClose}>Browse More Stories</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
