import React from "react";
import { Button } from "./ui/button";

interface ThemeButtonProps extends React.ComponentProps<typeof Button> { }

export default function ThemeButton({ className, ...props }: ThemeButtonProps) {
  return (
    <Button
      className={`bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded ${className}`}
      {...props}
    />
  );
}
