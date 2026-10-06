import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-card ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}