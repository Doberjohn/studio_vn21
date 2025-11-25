import React from "react";
import { Link } from "react-router";
import { Button } from "~/components/Button";

export function CTA() {
  return (
    <div className="py-20 px-8 bg-black border-t-8 border-gray-800">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-white text-xl mb-6">Ready to start reading?</p>
        <p className="text-gray-300 text-lg mb-8">
          Join hundreds of readers discovering amazing stories every day.
        </p>
        <Link to="/dashboard">
          <Button>Start Reading Now</Button>
        </Link>
      </div>
    </div>
  );
}
