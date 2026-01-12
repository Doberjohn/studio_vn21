import { Search, Bell } from "lucide-react";
import React from "react";
import { Button } from "~/components/UI/Button";
import { Brand } from "~/components/UI/Brand";

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
        <Button variant="nav">
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="nav">
          <Bell className="w-5 h-5" />
        </Button>
      </div>
    </Brand>
  );
}
