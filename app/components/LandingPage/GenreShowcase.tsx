import React from "react";
import {
  Drama,
  Gamepad2,
  HatGlasses,
  Heart,
  Orbit,
  Skull,
  Sparkles,
  Swords,
  Trees,
  Zap,
} from "lucide-react";

export function GenreShowcase() {
  return (
    <div className="py-20 px-8 bg-black border-t-8 border-gray-800">
      <div className="max-w-6xl mx-auto">
        <p className="text-white text-center text-xl mb-4">
          Every Genre You Love
        </p>
        <p className="text-gray-400 text-center mb-12 text-lg">
          From spine-tingling horror to heartwarming romance
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            {
              name: "Fantasy",
              icon: Swords,
              color: "from-orange-600 to-yellow-600",
            },
            {
              name: "Mystery",
              icon: HatGlasses,
              color: "from-indigo-900 to-purple-800",
            },
            { name: "Romance", icon: Heart, color: "from-red-600 to-pink-600" },
            {
              name: "Sci-Fi",
              icon: Orbit,
              color: "from-blue-600 to-green-800",
            },
            {
              name: "Horror",
              icon: Skull,
              color: "from-black-700 to-gray-900",
            },
            {
              name: "Adventure",
              icon: Trees,
              color: "from-green-600 to-teal-600",
            },
            { name: "Thriller", icon: Zap, color: "from-red-700 to-gray-900" },
            {
              name: "Drama",
              icon: Drama,
              color: "from-yellow-900 to-rose-800",
            },
            {
              name: "Fanfiction",
              icon: Sparkles,
              color: "from-lime-500 to-orange-600",
            },
            {
              name: "Interactive stories",
              icon: Gamepad2,
              color: "from-indigo-700 to-amber-600",
            },
          ].map((genre) => (
            <div
              key={genre.name}
              className={`bg-gradient-to-br ${genre.color} p-8 rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform`}
            >
              <genre.icon className="w-8 h-8 text-white mb-2" />
              <span className="text-white">{genre.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
