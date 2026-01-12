import { Clock, LibraryBig, UserStar } from "lucide-react";
import React from "react";

export function LandingAdvantages() {
  return (
    <section
      className="py-20 px-8 bg-black border-t-8 border-gray-800"
      aria-labelledby="advantages-title"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="advantages-title"
          className="text-white text-center text-2xl md:text-3xl font-bold mb-16"
        >
          Why read on Studio VN21?
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
              aria-hidden="true"
            >
              <LibraryBig className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">
              Endless Library
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Hundreds of curated short stories across all genres, from fantasy
              to thriller.
            </p>
          </div>

          <div className="text-center">
            <div
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
              aria-hidden="true"
            >
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">
              Quick Reads
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Perfect for your coffee break. Most stories take 5-10 minutes to
              read.
            </p>
          </div>

          <div className="text-center">
            <div
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
              aria-hidden="true"
            >
              <UserStar className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-3">
              Personalized
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Get recommendations based on your reading preferences and history.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
