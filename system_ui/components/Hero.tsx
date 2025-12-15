"use client";

import Link from "next/link";
import React from "react";

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  reverse?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export default function Hero({ title, subtitle, imageSrc, reverse, ctaText, ctaLink }: HeroProps) {
  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${imageSrc})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">{title}</h1>
        <p className="mt-6 text-lg md:text-xl text-white drop-shadow-md">{subtitle}</p>
        {ctaText && ctaLink && (
          <Link href={ctaLink} className="mt-8 inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg">
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
}
