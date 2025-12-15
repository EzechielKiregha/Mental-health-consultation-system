import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
