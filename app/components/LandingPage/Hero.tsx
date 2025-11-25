import { Link } from "react-router";
import { ButtonWithIcon } from "~/components/ButtonWithIcon";
import { BookOpen } from "lucide-react";
import React from "react";

export function Hero() {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0">
        <img
          src={"./landing_banner.webp"}
          alt={"Landing Banner"}
          className={"w-full h-full object-cover"}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative h-full flex items-center justify-center px-8">
        <div className="flex items-center flex-col text-center max-w-4xl">
          <p className="text-white text-4xl mb-6">Welcome to Studio VN21</p>
          <p className="text-white text-xl mb-4">
            The best place to read short stories online.
          </p>
          <p className="text-white text-lg mb-8">
            Free to read. No sign-up required.
          </p>
          <Link to="/dashboard">
            <ButtonWithIcon>
              <BookOpen className="w-6 h-6" />
              Start Reading
            </ButtonWithIcon>
          </Link>
        </div>
      </div>
    </div>
  );
}
