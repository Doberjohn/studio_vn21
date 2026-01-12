import React from "react";
import { cn } from "~/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "nav" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const baseStyles = "transition-colors cursor-pointer rounded";
  
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    nav: "text-white hover:text-gray-300",
    outline: "border border-white text-white hover:bg-white hover:text-black",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-3 text-lg",
    xl: "px-10 py-4 text-xl flex items-center gap-3",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
