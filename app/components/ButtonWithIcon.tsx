import React from "react";

export function ButtonWithIcon(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      onClick={props.onClick}
      className="flex items-center gap-3 bg-red-600 text-white px-10 py-4 rounded text-xl hover:bg-red-700 transition-colors cursor-pointer"
    >
      {props.children}
    </button>
  );
}
