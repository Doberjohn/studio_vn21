import React from "react";

export function ReadingExperience() {
  return (
    <div className="py-20 px-8 bg-black border-t-8 border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-white text-xl mb-6">Read on any device</p>
            <p className="text-gray-300 text-lg mb-6">
              Seamless reading experience across all your devices. Start a story
              on your phone during your commute and finish it on your tablet at
              home.
            </p>
            <p className="text-gray-300 text-lg">
              Clean, distraction-free interface designed for immersive reading.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src={"./tablet.webp"}
              alt={"Landing Banner"}
              className={"w-full h-full object-cover"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
