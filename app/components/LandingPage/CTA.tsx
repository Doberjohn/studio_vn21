import React from "react";
import { Link } from "react-router";
import { Button } from "~/components/UI/Button";

export function CTA() {
  return (
    <section
      className="py-20 px-8 bg-black border-t-8 border-gray-800"
      aria-labelledby="cta-title"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2
          id="cta-title"
          className="text-white text-2xl md:text-3xl font-bold mb-6"
        >
          Ready to start reading?
        </h2>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          Join hundreds of readers discovering amazing stories every day.
        </p>
        <Link to="/dashboard">
          <Button size="lg">Start Reading Now</Button>
        </Link>
      </div>
    </section>
  );
}
