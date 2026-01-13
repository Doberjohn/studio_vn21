import React from "react";
import { cn } from "~/shared/utils/cn";
import { Link } from "react-router";

export function Brand({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>): React.ReactElement {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-8 py-4 bg-gradient-to-b from-black to-transparent",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <Link to="/">
          <h1 className="text-white text-xl tracking-wider">Studio VN21</h1>
        </Link>
        {children}
      </div>
    </nav>
  );
}
