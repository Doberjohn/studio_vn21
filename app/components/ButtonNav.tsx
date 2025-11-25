import React from "react";

export function ButtonNav(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button className="text-white hover:text-gray-300 transition-colors cursor-pointer">
      {props.children}
    </button>
  );
}
