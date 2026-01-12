import type { Route } from "./+types/landing";
import { Button } from "~/shared/components/Button";
import React from "react";
import { Link } from "react-router";
import {
  Advantages,
  CTA,
  Hero,
  GenreShowcase,
  ReadingExperience,
} from "~/features/landing";
import { Brand } from "~/shared/components/Brand";
import { Footer } from "~/shared/components/Footer";

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
