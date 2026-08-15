import { Link } from "react-router-dom";
import type { ReactNode, MouseEvent, ElementType } from "react";

interface ButtonProps {
  as?: "button" | "link" | "a";
  variant?: "solid" | "outline";
  children?: ReactNode;
  className?: string;
  href?: string;
  to?: string;
  onClick?: (event: MouseEvent) => void;
  [key: string]: unknown;
}

export const Button = ({
  as = "button",
  variant = "solid",
  children,
  className = "",
  href,
  to,
  onClick,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-1 text-lg font-bold rounded border-2 transition-all duration-200 active:shadow-none active:translate-x-1 active:translate-y-1 cursor-pointer";
  const variants: Record<"solid" | "outline", string> = {
    solid:
      "bg-emerald-500 text-white border-emerald-700 shadow-[4px_4px_0px_rgba(4,120,87,1)] hover:shadow-[2px_2px_0px_rgba(4,120,87,1)]",
    outline:
      "bg-white text-emerald-500 border-emerald-500 shadow-[4px_4px_0px_rgba(16,185,129,0.5)] hover:shadow-[2px_2px_0px_rgba(16,185,129,0.5)]",
  };

  const Component: ElementType = as === "link" ? Link : as === "a" ? "a" : "button";

  return (
    <Component
      className={`${baseStyles} ${variants[variant]} ${className}`}
      to={as === "link" ? to : undefined}
      href={as === "a" ? href : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};
