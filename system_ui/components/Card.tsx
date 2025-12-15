import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-green-50 border border-green-600 rounded-lg p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
