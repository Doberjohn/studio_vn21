import React from "react";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors cursor-pointer">
      {props.children}
    </button>
  );
}
