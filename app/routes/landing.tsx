import type { Route } from "./+types/landing";
import { Button } from "~/components/Button";
import React from "react";
import { Link } from "react-router";
import { Footer } from "~/components/LandingPage/Footer";
import { CTA } from "~/components/LandingPage/CTA";
import { ReadingExperience } from "~/components/LandingPage/ReadingExperience";
import { GenreShowcase } from "~/components/LandingPage/GenreShowcase";
import { Advantages } from "~/components/LandingPage/Advantages";
import { Hero } from "~/components/LandingPage/Hero";
import { Brand } from "~/components/Brand";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Studio VN21" },
    { name: "description", content: "Welcome to Studio VN21!" },
  ];
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Brand>
        <Link to="/dashboard">
          <Button>Browse Stories</Button>
        </Link>
      </Brand>
      <Hero />
      <Advantages />
      <GenreShowcase />
      <ReadingExperience />
      <CTA />
      <Footer />
    </div>
  );
}
