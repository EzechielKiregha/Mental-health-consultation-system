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
      className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-screen ${reverse ? "md:flex-row-reverse" : ""}`}
      style={{ backgroundImage: `url(${imageSrc})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/40"></div> {/* Optional overlay for better contrast */}
      <div className="relative flex flex-col lg:items-center items-center py-20 bg-white/70 backdrop-blur-md rounded-r-lg shadow-lg">
        <h1 className="text-4xl font-bold text-green-800">{title}</h1>
        <p className="mt-4 text-gray-800">{subtitle}</p>
        <Link href={ctaLink ? ctaLink : "#"} className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
          {ctaText}
        </Link>
      </div>
      <div className="relative hidden md:block">
        <img src={imageSrc} alt={title} className="rounded-l-lg shadow-lg" />
      </div>
    </div>
  );
}
