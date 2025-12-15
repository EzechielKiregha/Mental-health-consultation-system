"use client";

import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={`p-4 rounded-lg shadow-md ${className}`}>{children}</div>;
}

export function CardHeader({ children }: CardProps) {
  return <div className="mb-4 border-b pb-2">{children}</div>;
}

export function CardBody({ children }: CardProps) {
  return <div className="space-y-2">{children}</div>;
}

export function CardFooter({ children }: CardProps) {
  return <div className="mt-4">{children}</div>;
}
