import React from "react";
import Card from "./Card";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="text-center">
      <div className="text-4xl mb-4 text-green-600">{icon}</div>
      <h3 className="text-lg font-bold text-green-800">{title}</h3>
      <p className="text-sm text-gray-800">{description}</p>
    </Card>
  );
}
