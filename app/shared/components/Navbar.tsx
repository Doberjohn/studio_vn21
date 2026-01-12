import { Search, Bell } from "lucide-react";
import React from "react";
import { Button } from "./Button";
import { Brand } from "./Brand";

export function Navbar() {
  return (
    <Brand>
      <div className="hidden md:flex gap-6">
        <Button variant="nav">Home</Button>
        <Button variant="nav">Genres</Button>
        <Button variant="nav">Trending</Button>
        <Button variant="nav">My List</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="nav" aria-label="Search stories">
          <Search className="w-5 h-5" aria-hidden="true" />
        </Button>
        <Button variant="nav" aria-label="Notifications">
          <Bell className="w-5 h-5" aria-hidden="true" />
        </Button>
      </div>
    </Brand>
  );
}
