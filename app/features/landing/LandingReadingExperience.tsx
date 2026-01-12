import React from "react";

export function LandingReadingExperience() {
  return (
    <section
      className="py-20 px-8 bg-black border-t-8 border-gray-800"
      aria-labelledby="experience-title"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              id="experience-title"
              className="text-white text-2xl md:text-3xl font-bold mb-6"
            >
              Read on any device
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Seamless reading experience across all your devices. Start a story
              on your phone during your commute and finish it on your tablet at
              home.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Clean, distraction-free interface designed for immersive reading.
            </p>
          </div>
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl shadow-red-600/10">
            <img
              src={"./tablet.webp"}
              alt={
                "Studio VN21 interface displayed on a tablet and mobile device"
              }
              className={"w-full h-full object-cover"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
