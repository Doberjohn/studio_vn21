import { Search, Bell } from "lucide-react";
import React from "react";
import { ButtonNav } from "~/components/ButtonNav";
import { Brand } from "~/components/Brand";

export function Navbar() {
  return (
    <Brand>
      <div className="hidden md:flex gap-6">
        <ButtonNav>Home</ButtonNav>
        <ButtonNav>Genres</ButtonNav>
        <ButtonNav>Trending</ButtonNav>
        <ButtonNav>My List</ButtonNav>
      </div>
      <div className="flex items-center gap-4">
        <ButtonNav>
          <Search className="w-5 h-5" />
        </ButtonNav>
        <ButtonNav className="text-white hover:text-gray-300 transition-colors">
          <Bell className="w-5 h-5" />
        </ButtonNav>
      </div>
    </Brand>
  );
}
