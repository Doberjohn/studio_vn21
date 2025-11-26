import React from "react";

export function ButtonNav(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button onClick={props.onClick} className="text-white hover:text-gray-300 transition-colors cursor-pointer">
      {props.children}
    </button>
  );
}
