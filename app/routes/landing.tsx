import type { Route } from "./+types/landing";
import { Button } from "~/components/Button";
import { ButtonWithIcon } from "~/components/ButtonWithIcon";
import { BookOpen } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { Footer } from "~/components/LandingPage/Footer";
import { CTA } from "~/components/LandingPage/CTA";
import { ReadingExperience } from "~/components/LandingPage/ReadingExperience";
import { GenreShowcase } from "~/components/LandingPage/GenreShowcase";
import { Advantages } from "~/components/LandingPage/Advantages";
import { Hero } from "~/components/LandingPage/Hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Studio VN21" },
    { name: "description", content: "Welcome to Studio VN21!" },
  ];
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 bg-gradient-to-b from-black to-transparent">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-xl tracking-wider">Studio VN21</h1>
          <Link to="/dashboard">
            <Button>Browse Stories</Button>
          </Link>
        </div>
      </nav>
      <Hero />
      <Advantages />
      <GenreShowcase />
      <ReadingExperience />
      <CTA />
      <Footer />
    </div>
  );
}
