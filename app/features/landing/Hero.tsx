import { Link } from "react-router";
import { Button } from "~/shared/components/Button";
import { BookOpen } from "lucide-react";
import React from "react";

export function Hero() {
  return (
    <header className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={"./landing_banner.webp"}
          alt="Atmospheric background showing a cozy reading setting"
          className={"w-full h-full object-cover"}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex items-center justify-center px-8">
        <div className="flex items-center flex-col text-center max-w-4xl">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Welcome to Studio VN21
          </h1>
          <p className="text-white text-xl md:text-2xl mb-4 font-medium">
            The best place to read short stories online.
          </p>
          <p className="text-white/80 text-lg mb-8">
            Free to read. No sign-up required.
          </p>
          <Link to="/dashboard">
            <Button size="xl">
              <BookOpen className="w-6 h-6" aria-hidden="true" />
              <span>Start Reading</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
