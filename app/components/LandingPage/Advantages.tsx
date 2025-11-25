import { Clock, LibraryBig, UserStar } from "lucide-react";
import React from "react";

export function Advantages() {
  return (
    <div className="py-20 px-8 bg-black border-t-8 border-gray-800">
      <div className="max-w-6xl mx-auto">
        <p className="text-white text-center text-xl mb-16">
          Why read on Studio VN21?
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <LibraryBig className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white mb-3">Endless Library</h3>
            <p className="text-gray-400">
              Hundreds of curated short stories across all genres, from fantasy
              to thriller.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white mb-3">Quick Reads</h3>
            <p className="text-gray-400">
              Perfect for your coffee break. Most stories take 5-10 minutes to
              read.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserStar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white mb-3">Personalized</h3>
            <p className="text-gray-400">
              Get recommendations based on your reading preferences and history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
