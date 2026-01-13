import { Bell, LogOut, Search } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./Button";
import { Brand } from "./Brand";
import { useEffect, useState } from "react";
import { getUser } from "~/shared/auth/auth.client";

export function Navbar() {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    getUser().then((authUser) => {
      if (authUser) {
        setUser({ email: authUser.email || "" });
      }
    });
  }, []);

  return (
    <Brand>
      <div className="hidden md:flex gap-6">
        <Link to="/dashboard">
          <Button variant="nav">Home</Button>
        </Link>
        <Button variant="nav">Genres</Button>
        <Button variant="nav">Trending</Button>
        <Button variant="nav">My List</Button>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link to="/adminManagementSection">
              <Button variant="nav">Admin</Button>
            </Link>
            <Link to="/logout">
              <Button
                variant="nav"
                aria-label="Sign out"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="nav">Login</Button>
            </Link>
            <Button variant="nav" aria-label="Search stories">
              <Search className="w-5 h-5" aria-hidden="true" />
            </Button>
          </>
        )}
        <Button variant="nav" aria-label="Notifications">
          <Bell className="w-5 h-5" aria-hidden="true" />
        </Button>
      </div>
    </Brand>
  );
}
