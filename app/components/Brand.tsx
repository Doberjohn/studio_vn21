import React from "react";

export function Brand(props: React.HtmlHTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-4 bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-xl tracking-wider">Studio VN21</h1>
        {props.children}
      </div>
    </nav>
  );
}